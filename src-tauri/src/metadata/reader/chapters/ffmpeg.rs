use crate::metadata::types::Chapter;
use ffmpeg_next as ffmpeg;
pub fn read_chapters_with_ffmpeg(path: &str) -> Result<Vec<Chapter>, ffmpeg::Error> {
    // Safe to call multiple times; no-op after first
    let _ = ffmpeg::init();

    let ictx = ffmpeg::format::input(path)?;
    let mut chapters: Vec<Chapter> = Vec::new();

    for ch in ictx.chapters() {
        let title = ch.metadata().get("title").map(|v| v.to_string());
        chapters.push(Chapter {
            id: ch.id(),
            title,
            // This matches your previous assumption in reader_old.rs:
            // use the chapter's start as milliseconds
            start_time: ch.start(),
        });
    }

    Ok(chapters)
}

