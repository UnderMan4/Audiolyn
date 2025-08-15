use lofty::tag::Tag;
use crate::metadata::types::Chapter;

pub fn parse_vorbis_chapters(tag: &Tag) -> Vec<Chapter> {
    // Xiph convention: CHAPTER001=HH:MM:SS.mmm and CHAPTER001NAME=Title
    use regex::Regex;
    let re_time = Regex::new(r"^CHAPTER(\d{3})$").unwrap();

    let mut times: Vec<(String, String)> = Vec::new();
    let mut names: Vec<(String, String)> = Vec::new();

    for item in tag.items() {
        let k_dbg = format!("{:?}", item.key());
        if let Some(cap) = re_time.captures(&k_dbg) {
            if let Some(val) = item.value().text() {
                times.push((cap[1].to_string(), val.to_string()));
            }
            continue;
        }
        if let Some(idx) = k_dbg
            .strip_prefix("CHAPTER")
            .and_then(|s| s.strip_suffix("NAME"))
        {
            if let Some(val) = item.value().text() {
                names.push((idx.to_string(), val.to_string()));
            }
        }
    }

    times.sort_by(|a, b| a.0.cmp(&b.0));

    fn parse_hhmmss_ms(s: &str) -> i64 {
        let parts: Vec<&str> = s.split(':').collect();
        if parts.len() < 3 {
            return 0;
        }
        let h = parts[0].parse::<i64>().unwrap_or(0);
        let m = parts[1].parse::<i64>().unwrap_or(0);
        let (sec, frac) = parts[2].split_once('.').unwrap_or((parts[2], "0"));
        let s_val = sec.parse::<i64>().unwrap_or(0);
        let frac_ms =
            (frac.parse::<i64>().unwrap_or(0)) * 10i64.pow(3u32.saturating_sub(frac.len() as u32));
        h * 3_600_000 + m * 60_000 + s_val * 1_000 + frac_ms
    }

    let mut chapters = Vec::new();
    for (idx, t) in times {
        let start_ms = parse_hhmmss_ms(&t);
        let title_opt = names
            .iter()
            .find(|(i, _)| *i == idx)
            .map(|(_, n)| n.clone());

        chapters.push(Chapter {
            id: idx.parse::<i64>().unwrap_or(0),
            title: title_opt,
            start_time: start_ms,
        });
    }
    chapters
}
