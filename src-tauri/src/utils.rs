pub fn opt_str_to_string(opt: Option<&str>) -> Option<String> {
    opt.map(|s| s.to_string())
}

pub fn slice_to_option_vec<T: Clone>(slice: &[T]) -> Option<Vec<T>> {
    if slice.is_empty() {
        None
    } else {
        Some(slice.to_vec())
    }
}
