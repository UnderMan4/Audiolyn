use derive_builder::Builder;
use serde::Serialize;
use std::collections::HashMap;

#[derive(Debug, Clone, Serialize)]
#[allow(dead_code)]
#[serde(rename_all = "camelCase")]
pub struct Chapter {
    pub id: i64,
    pub title: Option<String>,
    pub start_time: i64,
}

#[derive(Debug, Clone, Builder, Default, Serialize)]
#[builder(default)]
#[serde(rename_all = "camelCase")]
pub struct AudiobookInfo {
    metadata: HashMap<String, String>,
    cover_images: Vec<CoverImage>,
    chapters: Option<Vec<Chapter>>,
    duration: u128,
    bitrate: Option<u32>,
    sample_rate: Option<u32>,
    channels: Option<u8>,
    bit_depth: Option<u8>,
}

#[derive(Debug, Clone, Builder, Default, Serialize)]
#[builder(default)]
#[serde(rename_all = "camelCase")]
pub struct CoverImage {
    pub data: Vec<u8>,
    pub mime_type: Option<String>,
    pub picture_type: Option<String>,
    pub extension: Option<String>,
}
