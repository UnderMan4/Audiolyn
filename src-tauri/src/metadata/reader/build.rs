use crate::metadata::reader::covers::convert_picture_to_cover_image;
use crate::metadata::reader::tags::extractors::extract_typed_fields;
use crate::metadata::reader::tags::raw::collect_raw_tags;
use crate::metadata::types::{AudiobookInfoBuilder, CoverImage};
use lofty::tag::Tag;

//noinspection t
pub fn fill_primary_tag(builder: &mut AudiobookInfoBuilder, tag: &Tag) {
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
}

pub fn fill_raw_tags(builder: &mut AudiobookInfoBuilder, tags: &[Tag]) {
    builder.raw_tags(collect_raw_tags(tags));
}
