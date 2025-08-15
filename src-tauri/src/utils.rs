pub fn opt_str_to_string(opt: Option<&str>) -> Option<String> {
    opt.map(|s| s.to_string())
}

pub fn get_file_name(file_path: &str) -> (String, String) {
    let path = std::path::Path::new(file_path);
    let file_stem = path
        .file_stem()
        .and_then(|s| s.to_str())
        .unwrap_or("unknown")
        .to_string();
    let extension = path
        .extension()
        .and_then(|e| e.to_str())
        .unwrap_or("")
        .to_string();
    (file_stem, extension)
}