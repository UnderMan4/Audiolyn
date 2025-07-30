pub fn opt_str_to_string(opt: Option<&str>) -> Option<String> {
    opt.map(|s| s.to_string())
}