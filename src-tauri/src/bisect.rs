use serde::{Deserialize, Serialize};
use specta::Type;
use tauri_derive::export_ts;

use crate::{branch::RepoExt, AppResult};

#[derive(Debug, Default, Clone, Serialize, Deserialize, Type)]
pub struct BisectRange {
    good: Option<String>,
    bad: Option<String>,
}

pub trait BisectExt {
    fn bisect_start(&self) -> AppResult<()>;
    fn bisect_stop(&self) -> AppResult<()>;
    fn bisect_mark_good(&self, oid: &str) -> AppResult<()>;
    fn bisect_mark_bad(&self, oid: &str) -> AppResult<()>;
    fn bisect_get_next(&self) -> AppResult<Option<String>>;
    fn bisect_get_range(&self) -> AppResult<BisectRange>;
}

#[export_ts(scope = "bisect")]
impl BisectExt for git2::Repository {
    fn bisect_start(&self) -> AppResult<()> {
        self.exec_git(["bisect", "start"])?;
        Ok(())
    }

    fn bisect_stop(&self) -> AppResult<()> {
        self.exec_git(["bisect", "reset"])?;
        Ok(())
    }

    fn bisect_mark_good(&self, oid: &str) -> AppResult<()> {
        self.exec_git(["bisect", "good", oid])?;
        Ok(())
    }

    fn bisect_mark_bad(&self, oid: &str) -> AppResult<()> {
        self.exec_git(["bisect", "bad", oid])?;
        Ok(())
    }

    fn bisect_get_next(&self) -> AppResult<Option<String>> {
        let output = self.exec_git(["bisect", "next"])?;
        let output = String::from_utf8(output.stdout)?;
        let Some(output) = output.lines().nth(1) else {
            return Ok(None);
        };
        if output.len() < 42 {
            return Ok(None);
        }
        let output = &output[1..41];
        Ok(Some(output.to_string()))
    }

    fn bisect_get_range(&self) -> AppResult<BisectRange> {
        let output = self.exec_git(["bisect", "log"])?.stdout;
        let output = String::from_utf8(output)?;

        Ok(parse_bisect_log(&output))
    }
}

fn parse_bisect_log(output: &str) -> BisectRange {
    let mut range = BisectRange::default();
    // FIXME: check range!
    if let Some(item) = output
        .lines()
        .rev()
        .find(|item| item.starts_with("git bisect bad"))
    {
        if let Some((_, oid)) = item.split_once("git bisect bad") {
            let oid = oid.trim();
            if oid.len() == 40 {
                let _ = range.bad.insert(oid.to_string());
            }
        }
    }

    if let Some(item) = output
        .lines()
        .rev()
        .find(|item| item.starts_with("git bisect good"))
    {
        if let Some((_, oid)) = item.split_once("git bisect good") {
            let oid = oid.trim();
            if oid.len() == 40 {
                let _ = range.good.insert(oid.to_string());
            }
        }
    }

    range
}

#[cfg(test)]
mod test {
    use super::*;

    #[test]
    fn test_parse_log() {
        let content = r#"
git bisect start
# 状态：正在等待好的和坏的提交
# bad: [dd420a6d25d037decd7b81175626dfca817437ff] Merge pull request #13644 from Olexandr88/patch-1
git bisect bad dd420a6d25d037decd7b81175626dfca817437ff
# 状态：正在等待好的提交，已知坏的提交
# good: [f34d88e30c7d8be7181f728d1abc4fd8d5cd07d3] Merge pull request #12558 from danielrentz/patch-1
git bisect good f34d88e30c7d8be7181f728d1abc4fd8d5cd07d3
# good: [0f5e990b8a04f53861d64ff53751517bbf73d867] fix(babel-preset-react-app): add missing dependency (#12364)
git bisect good 0f5e990b8a04f53861d64ff53751517bbf73d867
        "#;
        let v = parse_bisect_log(content);
        assert_eq!(v.good.unwrap(), "0f5e990b8a04f53861d64ff53751517bbf73d867");
        assert_eq!(v.bad.unwrap(), "dd420a6d25d037decd7b81175626dfca817437ff");
    }
}
