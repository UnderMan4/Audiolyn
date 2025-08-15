use crate::metadata::reader::build::{fill_primary_tag, fill_raw_tags};
use crate::metadata::reader::chapters::fill_chapters;
use crate::metadata::reader::file_info::build_file_info;
use crate::metadata::reader::props::fill_properties;
use crate::metadata::types::{AudiobookInfo, AudiobookInfoBuilder};
use lofty::config::{ParseOptions, ParsingMode};
use lofty::file::AudioFile;
use lofty::prelude::TaggedFileExt;
use lofty::probe::Probe;

mod build;
mod chapters;
mod covers;
mod file_info;
mod props;
mod tags;

pub fn get_metadata(path: &str) -> Result<AudiobookInfo, Box<dyn std::error::Error>> {
    let probe = Probe::open(path)?.options(ParseOptions::new().parsing_mode(ParsingMode::Relaxed));
    let file = probe.read()?; // auto-detects format

    let mut builder = AudiobookInfoBuilder::default();
    builder.file(build_file_info(path)?);

    fill_properties(&mut builder, file.properties());

    if let Some(tag) = file.primary_tag() {
        fill_primary_tag(&mut builder, &tag);
        fill_chapters(&mut builder, &tag, &path);
    }

    fill_raw_tags(&mut builder, file.tags());

    Ok(builder.build().unwrap())
}
