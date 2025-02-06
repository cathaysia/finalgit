use lazy_regex::regex;

pub(crate) fn analyzer_shebang(content: &str) -> Option<&str> {
    let shebang = get_shebang(content)?;
    Some(match shebang {
        "sh" | "bash" => "bash",
        "zsh" => "zsh",
        "python2" => "python2",
        "python3" | "python" => "python3",
        "perl" => "perl",
        "awk" => "awk",
        _ => None?,
    })
}

pub fn get_shebang(content: &str) -> Option<&str> {
    let re1 = regex!(r#"#!\s*/usr/bin/env\s+(\S+)"#);
    let re2 = regex!(r#"#!\s*/\S+/([^ /]+)"#);

    let firstline = content.lines().next()?;
    if let Some(group) = re1.captures(firstline) {
        if let Some(path) = group.get(1) {
            return Some(path.as_str());
        }
    }

    if let Some(group) = re2.captures(firstline) {
        if let Some(path) = group.get(1) {
            return Some(path.as_str());
        }
    }

    None
}
