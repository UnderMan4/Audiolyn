use std::collections::HashMap;
use lofty::tag::Tag;

pub fn collect_raw_tags(tags: &[Tag]) -> HashMap<String, String> {
    let mut map = HashMap::new();
    for tag in tags {
        for item in tag.items() {
            if let Some(val) = item.value().text() {
                // Debug string of ItemKey is the most portable here
                map.insert(format!("{:?}", item.key()), val.to_string());
            }
        }
    }
    map
}
