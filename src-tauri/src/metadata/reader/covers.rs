use lofty::picture::Picture;
use crate::metadata::types::CoverImage;

pub fn convert_picture_to_cover_image(p: &Picture) -> CoverImage {
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