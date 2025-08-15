use crate::metadata::reader::tags::helpers::{
    dedup, first_nonempty, get_item_string, get_unknown_key, get_vorbis_string, split_names_list,
};
use lofty::prelude::ItemKey;
use lofty::tag::Tag;
use std::collections::HashMap;

fn extract_title(tag: &Tag) -> Option<String> {
    first_nonempty(vec![
        get_unknown_key(tag, "@sti"),
        get_item_string(tag, ItemKey::TrackTitle),
        get_item_string(tag, ItemKey::AlbumTitle),
    ])
}

fn extract_subtitle(tag: &Tag) -> Option<String> {
    first_nonempty(vec![
        get_vorbis_string(tag, "SUBTITLE"),
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
    if let Some(v) = get_vorbis_string(tag, "AUTHOR") {
        authors.extend(split_names_list(&v));
    }
    if let Some(v) = get_item_string(tag, ItemKey::TrackArtist) {
        authors.extend(split_names_list(&v));
    }
    if authors.is_empty() {
        if let Some(v) = tag.items().find_map(|it| {
            let k = format!("{:?}", it.key());
            k.eq_ignore_ascii_case("AUTHOR")
                .then(|| it.value().text().map(|s| s.to_string()))
                .flatten()
        }) {
            authors.extend(split_names_list(&v));
        }
    }
    dedup(authors)
}

fn extract_narrators(tag: &Tag) -> Vec<String> {
    let mut narrators: Vec<String> = Vec::new();
    if let Some(v) = get_vorbis_string(tag, "NARRATOR") {
        narrators.extend(split_names_list(&v));
    }
    if narrators.is_empty() {
        if let Some(v) = tag.items().find_map(|it| {
            let k = format!("{:?}", it.key());
            k.contains("NARRATOR")
                .then(|| it.value().text().map(|s| s.to_string()))
                .flatten()
        }) {
            narrators.extend(split_names_list(&v));
        }
    }
    if narrators.is_empty() {
        if let Some(v) = get_vorbis_string(tag, "PERFORMER") {
            narrators.extend(split_names_list(&v));
        }
    }
    if narrators.is_empty() {
        if let Some(v) = get_item_string(tag, ItemKey::AlbumArtist) {
            narrators.extend(split_names_list(&v));
        }
    }
    dedup(narrators)
}

fn extract_publisher(tag: &Tag) -> Option<String> {
    first_nonempty(vec![
        get_item_string(tag, ItemKey::Publisher),
        get_vorbis_string(tag, "PUBLISHER"),
    ])
}

fn extract_series_name(tag: &Tag) -> Option<String> {
    first_nonempty(vec![
        get_vorbis_string(tag, "SERIES"),
        tag.items().find_map(|it| {
            let k = format!("{:?}", it.key());
            k.contains("SERIES")
                .then(|| it.value().text().map(|s| s.to_string()))
                .flatten()
        }),
        get_item_string(tag, ItemKey::AlbumTitle),
    ])
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

fn extract_series_index(tag: &Tag) -> Option<u32> {
    first_nonempty(vec![
        get_vorbis_string(tag, "SERIES_PART"),
        get_vorbis_string(tag, "PART"),
        tag.items().find_map(|it| {
            let k = format!("{:?}", it.key());
            (k.contains("SERIES_PART") || k.contains("PART"))
                .then(|| it.value().text().map(|s| s.to_string()))
                .flatten()
        }),
        get_item_string(tag, ItemKey::TrackNumber),
    ])
    .and_then(|s| parse_series_index(&s))
}

fn extract_language(tag: &Tag) -> Option<String> {
    first_nonempty(vec![
        get_vorbis_string(tag, "LANGUAGE"),
        tag.items().find_map(|it| {
            let k = format!("{:?}", it.key());
            k.contains("LANGUAGE")
                .then(|| it.value().text().map(|s| s.to_string()))
                .flatten()
        }),
    ])
}

fn extract_release_date(tag: &Tag) -> Option<String> {
    first_nonempty(vec![
        get_item_string(tag, ItemKey::RecordingDate),
        get_vorbis_string(tag, "DATE"),
    ])
}

fn extract_asin(tag: &Tag) -> Option<String> {
    first_nonempty(vec![
        get_vorbis_string(tag, "ASIN"),
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
        get_vorbis_string(tag, "PRID"),
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
        get_vorbis_string(tag, "ISBN"),
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

pub fn extract_typed_fields(
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
