use super::types::{AudiobookInfo, AudiobookInfoBuilder, Chapter, CoverImage};

use crate::utils;
use ffmpeg_next as ffmpeg;
use lofty;
use lofty::config::{ParseOptions, ParsingMode};
use lofty::picture::Picture;
use lofty::prelude::*;
use lofty::probe::Probe;

fn convert_picture_to_cover_image(picture: &Picture) -> CoverImage {
    CoverImage {
        data: picture.data().to_vec(),
        mime_type: picture.mime_type().map(|mt| mt.as_str().to_string()),
        extension: picture
            .mime_type()
            .map(|mt| mt.ext().map(|e| e.to_string()))
            .flatten(),
        picture_type: picture.pic_type().as_ape_key().map(|k| k.to_string()),
    }
}

pub fn get_metadata(file_path: &str) -> Result<AudiobookInfo, Box<dyn std::error::Error>> {
    let media = Probe::open(file_path)?
        .options(ParseOptions::new().parsing_mode(ParsingMode::Relaxed))
        .read()?;

    let mut builder = AudiobookInfoBuilder::default();
    {
        let properties = media.properties();

        let duration = properties.duration().as_millis();
        let bitrate = properties.audio_bitrate();
        let sample_rate = properties.sample_rate();
        let channels = properties.channels();
        let bit_depth = properties.bit_depth();

        builder
            .duration(duration)
            .bitrate(bitrate)
            .sample_rate(sample_rate)
            .channels(channels)
            .bit_depth(bit_depth);
    }

    if let Some(tag) = media.primary_tag() {
        builder.cover_images(
            tag.pictures()
                .iter()
                .map(convert_picture_to_cover_image)
                .collect(),
        );
    }

    let ictx = ffmpeg::format::input(file_path)?;

    let metadata = ictx.metadata();
    builder.metadata(
        metadata
            .iter()
            .map(|(k, v)| (k.to_string(), v.to_string()))
            .collect(),
    );

    let chapters = ictx.chapters();

    if chapters.len() > 0 {
        builder.chapters(Some(
            chapters
                .map(|chapter| Chapter {
                    id: chapter.id(),
                    title: utils::opt_str_to_string(chapter.metadata().get("title")),
                    start_time: chapter.start(),
                })
                .collect(),
        ));
    }

    Ok(builder.build().unwrap())
}
