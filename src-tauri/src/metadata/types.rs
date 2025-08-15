use derive_builder::Builder;
use serde::Serialize;
use std::collections::HashMap;

#[derive(Debug, Clone, Serialize)]
#[serde(rename_all = "camelCase")]
pub struct Chapter {
    pub id: i64,
    pub title: Option<String>,
    /// start time in milliseconds
    pub start_time: i64,
}

#[derive(Debug, Clone, Serialize)]
#[serde(rename_all = "camelCase")]
pub struct CoverImage {
    /// Raw image bytes
    pub data: Vec<u8>,
    pub mime_type: Option<String>,
    pub picture_type: Option<String>,
    pub extension: Option<String>,
}

#[derive(Debug, Clone, Builder, Default, Serialize)]
#[builder(default)]
#[serde(rename_all = "camelCase")]
pub struct FileInfo {
    pub name: String,
    pub extension: String,
    pub size: u64,
    pub path: String,
}

#[derive(Debug, Clone, Builder, Default, Serialize)]
#[builder(default)]
#[serde(rename_all = "camelCase")]
pub struct AudiobookInfo {
    // ---- Strongly typed descriptive metadata ----
    pub title: Option<String>,
    pub subtitle: Option<String>,

    /// Author(s) of the work (writers)
    pub authors: Vec<String>,
    /// Narrator(s)
    pub narrators: Vec<String>,
    /// Publisher / label
    pub publisher: Option<String>,
    /// Series name (e.g., "The Expanse")
    pub series_name: Option<String>,
    /// Number within the series (1-based)
    pub series_index: Option<u32>,
    /// Language tag (e.g., "en", "en-US", "pl")
    pub language: Option<String>,
    /// Free-form release date (normalize later if you want)
    pub release_date: Option<String>,

    /// Useful identifiers commonly found in audiobook files
    pub asin: Option<String>,        // Audible ID
    pub audible_product_id: Option<String>, // e.g., prID / Audible internal
    pub isbn: Option<String>,        // if provided
    pub custom_ids: HashMap<String, String>, // any other IDs you want to keep

    // ---- Technical metadata ----
    /// Duration in milliseconds
    pub duration: u128,
    pub bitrate: Option<u32>,
    pub sample_rate: Option<u32>,
    pub channels: Option<u8>,
    pub bit_depth: Option<u8>,

    // ---- Rich content ----
    pub chapters: Option<Vec<Chapter>>,
    pub cover_images: Vec<CoverImage>,

    // ---- Raw for debugging / fallback ----
    pub raw_tags: HashMap<String, String>,

    // ---- File ----
    pub file: FileInfo,
}
