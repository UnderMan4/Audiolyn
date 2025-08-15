use crate::metadata::types::AudiobookInfoBuilder;

pub mod ffmpeg;
pub mod vorbis;

pub fn fill_chapters(
    builder: &mut AudiobookInfoBuilder,
    tag: &lofty::tag::Tag,
    path: &str,
) {
    // Vorbis/Opus/FLAC chapters
    if matches!(tag.tag_type(), lofty::tag::TagType::VorbisComments) {
        let chapters = vorbis::parse_vorbis_chapters(tag);
        if !chapters.is_empty() {
            builder.chapters(Some(chapters));
        }
    } else {
        if let Ok(ff_chapters) = ffmpeg::read_chapters_with_ffmpeg(path) {
            if !ff_chapters.is_empty() {
                builder.chapters(Some(ff_chapters));
            }
        }
    }


}