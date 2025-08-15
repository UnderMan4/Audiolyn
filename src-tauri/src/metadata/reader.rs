use std::collections::HashMap;

use lofty::file::TaggedFileExt;
use lofty::properties::FileProperties;
use lofty::picture::Picture;
use lofty::prelude::*;
use lofty::probe::Probe;
use lofty::tag::{ItemKey, Tag, TagType};

use super::types::{AudiobookInfo, AudiobookInfoBuilder, Chapter, CoverImage, FileInfo};
use crate::utils;

// ---------- helpers ----------

fn convert_picture_to_cover_image(p: &Picture) -> CoverImage {
    CoverImage {
        data: p.data().to_vec(),
        mime_type: p.mime_type().map(|mt| mt.as_str().to_string()),
        picture_type: p.pic_type().as_ape_key().map(|k| k.to_string()),
        extension: p
            .mime_type()
            .and_then(|mt| mt.as_str().split('/').nth(1))
            .map(|ext| ext.to_string()),
    }
}

fn text(tag: &Tag, key: ItemKey) -> Option<String> {
    tag.get_string(&key).map(|s| s.to_string())
}

fn vorbis(tag: &Tag, name: &str) -> Option<String> {
    // Arbitrary Vorbis comment fields (SERIES, SERIES_PART, NARRATOR, etc.)
    let key = ItemKey::from_key(TagType::VorbisComments, name);
    tag.get_string(&key).map(|s| s.to_string())
}

fn first_nonempty(xs: Vec<Option<String>>) -> Option<String> {
    xs.into_iter().flatten().find(|s| !s.trim().is_empty())
}

fn split_list(value: &str) -> Vec<String> {
    value
        .split(|c| c == ';' || c == ',')
        .map(|s| s.trim().to_string())
        .filter(|s| !s.is_empty())
        .collect()
}

fn parse_series_index(s: &str) -> Option<u32> {
    if let Ok(n) = s.trim().parse::<u32>() {
        return Some(n);
    }
    let digits: String = s.chars().filter(|c| c.is_ascii_digit()).collect();
    if digits.is_empty() {
        None
    } else {
        digits.parse::<u32>().ok()
    }
}

fn parse_vorbis_chapters(tag: &Tag) -> Vec<Chapter> {
    // Xiph convention: CHAPTER001=HH:MM:SS.mmm and CHAPTER001NAME=Title
    use regex::Regex;
    let re_time = Regex::new(r"^CHAPTER(\d{3})$").unwrap();

    let mut times: Vec<(String, String)> = Vec::new();
    let mut names: Vec<(String, String)> = Vec::new();

    for item in tag.items() {
        let k_dbg = format!("{:?}", item.key());
        if let Some(cap) = re_time.captures(&k_dbg) {
            if let Some(val) = item.value().text() {
                times.push((cap[1].to_string(), val.to_string()));
            }
            continue;
        }
        if let Some(idx) = k_dbg
            .strip_prefix("CHAPTER")
            .and_then(|s| s.strip_suffix("NAME"))
        {
            if let Some(val) = item.value().text() {
                names.push((idx.to_string(), val.to_string()));
            }
        }
    }

    times.sort_by(|a, b| a.0.cmp(&b.0));

    fn parse_hhmmss_ms(s: &str) -> i64 {
        let parts: Vec<&str> = s.split(':').collect();
        if parts.len() < 3 {
            return 0;
        }
        let h = parts[0].parse::<i64>().unwrap_or(0);
        let m = parts[1].parse::<i64>().unwrap_or(0);
        let (sec, frac) = parts[2].split_once('.').unwrap_or((parts[2], "0"));
        let s_val = sec.parse::<i64>().unwrap_or(0);
        let frac_ms =
            (frac.parse::<i64>().unwrap_or(0)) * 10i64.pow(3u32.saturating_sub(frac.len() as u32));
        h * 3_600_000 + m * 60_000 + s_val * 1_000 + frac_ms
    }

    let mut chapters = Vec::new();
    for (idx, t) in times {
        let start_ms = parse_hhmmss_ms(&t);
        let title_opt = names
            .iter()
            .find(|(i, _)| *i == idx)
            .map(|(_, n)| n.clone());

        chapters.push(Chapter {
            id: idx.parse::<i64>().unwrap_or(0),
            title: title_opt,
            start_time: start_ms,
        });
    }
    chapters
}

fn dedup(mut v: Vec<String>) -> Vec<String> {
    v.sort();
    v.dedup();
    v
}

fn collect_raw_tags(tags: &[Tag]) -> HashMap<String, String> {
    let mut map = HashMap::new();
    for tag in tags {
        for item in tag.items() {
            if let Some(val) = item.value().text() {
                // Debug string of ItemKey is the most portable here
                map.insert(format!("{:?}", item.key()), val.to_string());
            }
        }
    }
    map
}

fn extract_title(tag: &Tag) -> Option<String> {
    first_nonempty(vec![text(tag, ItemKey::TrackTitle)])
}

fn extract_subtitle(tag: &Tag) -> Option<String> {
    first_nonempty(vec![
        vorbis(tag, "SUBTITLE"),
        tag.items().find_map(|it| {
            let k = format!("{:?}", it.key());
            if k.contains("SUBTITLE") {
                it.value().text().map(|s| s.to_string())
            } else {
                None
            }
        }),
    ])
}

fn extract_authors(tag: &Tag) -> Vec<String> {
    let mut authors: Vec<String> = Vec::new();
    if let Some(v) = vorbis(tag, "AUTHOR") {
        authors.extend(split_list(&v));
    }
    if let Some(v) = text(tag, ItemKey::TrackArtist) {
        authors.extend(split_list(&v));
    }
    if authors.is_empty() {
        if let Some(v) = tag.items().find_map(|it| {
            let k = format!("{:?}", it.key());
            k.eq_ignore_ascii_case("AUTHOR")
                .then(|| it.value().text().map(|s| s.to_string()))
                .flatten()
        }) {
            authors.extend(split_list(&v));
        }
    }
    dedup(authors)
}

fn extract_narrators(tag: &Tag) -> Vec<String> {
    let mut narrators: Vec<String> = Vec::new();
    if let Some(v) = vorbis(tag, "NARRATOR") {
        narrators.extend(split_list(&v));
    }
    if narrators.is_empty() {
        if let Some(v) = tag.items().find_map(|it| {
            let k = format!("{:?}", it.key());
            k.contains("NARRATOR")
                .then(|| it.value().text().map(|s| s.to_string()))
                .flatten()
        }) {
            narrators.extend(split_list(&v));
        }
    }
    if narrators.is_empty() {
        if let Some(v) = vorbis(tag, "PERFORMER") {
            narrators.extend(split_list(&v));
        }
    }
    if narrators.is_empty() {
        if let Some(v) = text(tag, ItemKey::AlbumArtist) {
            narrators.extend(split_list(&v));
        }
    }
    dedup(narrators)
}

fn extract_publisher(tag: &Tag) -> Option<String> {
    first_nonempty(vec![
        text(tag, ItemKey::Publisher),
        vorbis(tag, "PUBLISHER"),
    ])
}

fn extract_series_name(tag: &Tag) -> Option<String> {
    first_nonempty(vec![
        vorbis(tag, "SERIES"),
        tag.items().find_map(|it| {
            let k = format!("{:?}", it.key());
            k.contains("SERIES")
                .then(|| it.value().text().map(|s| s.to_string()))
                .flatten()
        }),
        text(tag, ItemKey::AlbumTitle),
    ])
}

fn extract_series_index(tag: &Tag) -> Option<u32> {
    first_nonempty(vec![
        vorbis(tag, "SERIES_PART"),
        vorbis(tag, "PART"),
        tag.items().find_map(|it| {
            let k = format!("{:?}", it.key());
            (k.contains("SERIES_PART") || k.contains("PART"))
                .then(|| it.value().text().map(|s| s.to_string()))
                .flatten()
        }),
        text(tag, ItemKey::TrackNumber),
    ])
    .and_then(|s| parse_series_index(&s))
}

fn extract_language(tag: &Tag) -> Option<String> {
    first_nonempty(vec![
        vorbis(tag, "LANGUAGE"),
        tag.items().find_map(|it| {
            let k = format!("{:?}", it.key());
            k.contains("LANGUAGE")
                .then(|| it.value().text().map(|s| s.to_string()))
                .flatten()
        }),
    ])
}

fn extract_release_date(tag: &Tag) -> Option<String> {
    first_nonempty(vec![text(tag, ItemKey::RecordingDate), vorbis(tag, "DATE")])
}

fn extract_asin(tag: &Tag) -> Option<String> {
    first_nonempty(vec![
        vorbis(tag, "ASIN"),
        tag.items().find_map(|it| {
            let k = format!("{:?}", it.key());
            (k.contains("AUDIBLE") || k.contains("ASIN"))
                .then(|| it.value().text().map(|s| s.to_string()))
                .flatten()
        }),
    ])
}

fn extract_audible_product_id(tag: &Tag) -> Option<String> {
    first_nonempty(vec![
        vorbis(tag, "PRID"),
        tag.items().find_map(|it| {
            let k = format!("{:?}", it.key());
            k.eq_ignore_ascii_case("prID")
                .then(|| it.value().text().map(|s| s.to_string()))
                .flatten()
        }),
    ])
}

fn extract_isbn(tag: &Tag) -> Option<String> {
    first_nonempty(vec![
        vorbis(tag, "ISBN"),
        tag.items().find_map(|it| {
            let k = format!("{:?}", it.key());
            k.contains("ISBN")
                .then(|| it.value().text().map(|s| s.to_string()))
                .flatten()
        }),
    ])
}

fn extract_custom_ids(tag: &Tag) -> HashMap<String, String> {
    let mut custom_ids = HashMap::new();
    for it in tag.items() {
        let key_dbg = format!("{:?}", it.key()).to_uppercase();
        if key_dbg.contains("ID") || key_dbg.contains("IDENTIFIER") {
            if let Some(val) = it.value().text() {
                custom_ids.entry(key_dbg).or_insert_with(|| val.to_string());
            }
        }
    }
    custom_ids
}

fn extract_typed_fields(
    tag: &Tag,
) -> (
    Option<String>,          // title
    Option<String>,          // subtitle
    Vec<String>,             // authors
    Vec<String>,             // narrators
    Option<String>,          // publisher
    Option<String>,          // series_name
    Option<u32>,             // series_index
    Option<String>,          // language
    Option<String>,          // release_date
    Option<String>,          // asin
    Option<String>,          // audible_product_id
    Option<String>,          // isbn
    HashMap<String, String>, // custom ids
) {
    (
        extract_title(tag),
        extract_subtitle(tag),
        extract_authors(tag),
        extract_narrators(tag),
        extract_publisher(tag),
        extract_series_name(tag),
        extract_series_index(tag),
        extract_language(tag),
        extract_release_date(tag),
        extract_asin(tag),
        extract_audible_product_id(tag),
        extract_isbn(tag),
        extract_custom_ids(tag),
    )
}

// ---------- main API ----------

fn build_file_info(path: &str) -> Result<FileInfo, Box<dyn std::error::Error>> {
    let (name, extension) = utils::get_file_name(path);
    let size = std::fs::metadata(path)?.len();
    Ok(FileInfo {
        name,
        extension,
        size,
        path: path.to_string(),
    })
}

fn fill_properties(builder: &mut AudiobookInfoBuilder, props: &FileProperties) {
    builder
        .duration(props.duration().as_millis())
        .bitrate(props.audio_bitrate())
        .sample_rate(props.sample_rate())
        .channels(props.channels())
        .bit_depth(props.bit_depth());
}

//noinspection t
fn fill_primary_tag(builder: &mut AudiobookInfoBuilder, tag: &Tag) {
    // Covers
    let pics: Vec<CoverImage> = tag
        .pictures()
        .iter()
        .map(convert_picture_to_cover_image)
        .collect();
    if !pics.is_empty() {
        builder.cover_images(pics);
    }

    // Typed fields
    let (
        title,
        subtitle,
        authors,
        narrators,
        publisher,
        series_name,
        series_index,
        language,
        release_date,
        asin,
        audible_product_id,
        isbn,
        custom_ids,
    ) = extract_typed_fields(tag);

    if let Some(v) = title {
        builder.title(Some(v));
    }
    if let Some(v) = subtitle {
        builder.subtitle(Some(v));
    }
    if !authors.is_empty() {
        builder.authors(authors);
    }
    if !narrators.is_empty() {
        builder.narrators(narrators);
    }
    if let Some(v) = publisher {
        builder.publisher(Some(v));
    }
    if let Some(v) = series_name {
        builder.series_name(Some(v));
    }
    if let Some(v) = series_index {
        builder.series_index(Some(v));
    }
    if let Some(v) = language {
        builder.language(Some(v));
    }
    if let Some(v) = release_date {
        builder.release_date(Some(v));
    }
    if let Some(v) = asin {
        builder.asin(Some(v));
    }
    if let Some(v) = audible_product_id {
        builder.audible_product_id(Some(v));
    }
    if let Some(v) = isbn {
        builder.isbn(Some(v));
    }
    if !custom_ids.is_empty() {
        builder.custom_ids(custom_ids);
    }

    // Chapters (Vorbis/Opus/FLAC)
    if matches!(tag.tag_type(), TagType::VorbisComments) {
        let ch = parse_vorbis_chapters(tag);
        if !ch.is_empty() {
            builder.chapters(Some(ch));
        }
    }
}

fn fill_raw_tags(builder: &mut AudiobookInfoBuilder, tags: &[Tag]) {
    builder.raw_tags(collect_raw_tags(tags));
}

pub fn get_metadata(path: &str) -> Result<AudiobookInfo, Box<dyn std::error::Error>> {
    let mut probe = Probe::open(path)?;
    let file = probe.read()?; // auto-detects format

    let mut builder = AudiobookInfoBuilder::default();
    builder.file(build_file_info(path)?);

    fill_properties(&mut builder, file.properties());

    if let Some(tag) = file.primary_tag() {
        fill_primary_tag(&mut builder, tag);
    }

    fill_raw_tags(&mut builder, file.tags());

    Ok(builder.build().unwrap())
}
