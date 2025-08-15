use lofty::prelude::ItemKey;
use lofty::tag::{Tag, TagType};

pub fn get_item_string(tag: &Tag, key: ItemKey) -> Option<String> {
    tag.get_string(&key).map(|s| s.to_string())
}

pub fn get_vorbis_string(tag: &Tag, name: &str) -> Option<String> {
    // Arbitrary Vorbis comment fields (SERIES, SERIES_PART, NARRATOR, etc.)
    let key = ItemKey::from_key(TagType::VorbisComments, name);
    tag.get_string(&key).map(|s| s.to_string())
}


pub fn get_unknown_key(tag: &Tag, raw_key: &str) -> Option<String> {
    let key = ItemKey::Unknown(raw_key.to_string());
    tag.get_string(&key).map(|s| s.to_owned())
}


pub fn first_nonempty(xs: Vec<Option<String>>) -> Option<String> {
    xs.into_iter().flatten().find(|s| !s.trim().is_empty())
}

pub fn split_names_list(value: &str) -> Vec<String> {
    value
        .split(|c| c == ';' || c == ',')
        .map(|s| s.trim().to_string())
        .filter(|s| !s.is_empty())
        .collect()
}

pub fn dedup(mut v: Vec<String>) -> Vec<String> {
    v.sort();
    v.dedup();
    v
}
