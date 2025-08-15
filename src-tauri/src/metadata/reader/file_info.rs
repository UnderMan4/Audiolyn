use crate::metadata::types::FileInfo;
use crate::utils;

pub fn build_file_info(path: &str) -> Result<FileInfo, Box<dyn std::error::Error>> {
    let (name, extension) = utils::get_file_name(path);
    let size = std::fs::metadata(path)?.len();
    Ok(FileInfo {
        name,
        extension,
        size,
        path: path.to_string(),
    })
}