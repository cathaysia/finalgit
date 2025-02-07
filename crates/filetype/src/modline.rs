use lazy_regex::regex;

pub(crate) fn get_modline(content: &str) -> Option<&str> {
    let re1 = regex!(r#"vi:.*set ft=(\w+).*"#);
    let re2 = regex!(r#"vim:.*set ft=(\w+).*"#);
    let re3 = regex!(r#"ex:.*set ft=(\w+).*"#);

    content.lines().take(3).find_map(|line| {
        if let Some(group) = re1.captures(line) {
            if let Some(group) = group.get(1) {
                return Some(group.as_str());
            }
        }

        if let Some(group) = re2.captures(line) {
            if let Some(group) = group.get(1) {
                return Some(group.as_str());
            }
        }

        if let Some(group) = re3.captures(line) {
            if let Some(group) = group.get(1) {
                return Some(group.as_str());
            }
        }

        None
    })
}

#[cfg(test)]
mod test {
    use super::*;

    #[test]
    fn test_modline() {
        let map = [
            (r#"vi: set ft=vim"#, "vim"),
            (
                r#"
            #!/bin/bash
            ex: set ft=bash
            "#,
                "bash",
            ),
        ];

        for (content, ft) in map {
            assert_eq!(get_modline(content).unwrap(), ft);
        }
    }
}
