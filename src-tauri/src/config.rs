use crate::branch::RepoExt;
use std::collections::HashMap;

use itertools::Itertools;
use tauri_derive::export_ts;

use crate::AppResult;

pub trait ConfigExt {
    fn get_config(&self, key: &str) -> AppResult<String>;
    fn set_config(&self, key: &str, value: &str) -> AppResult<()>;
    fn get_configes(&self) -> AppResult<HashMap<String, String>>;
}

#[export_ts]
impl ConfigExt for git2::Repository {
    fn get_config(&self, key: &str) -> AppResult<String> {
        let output = self.exec_git(["config", "--get", key])?;
        let out = std::str::from_utf8(&output.stdout)?.trim();
        Ok(out.into())
    }
    fn set_config(&self, key: &str, value: &str) -> AppResult<()> {
        let _ = self.exec_git(["config", "--local", key, value])?;

        Ok(())
    }
    fn get_configes(&self) -> AppResult<HashMap<String, String>> {
        let output = self.exec_git(["config", "-l"])?;
        let output = String::from_utf8(output.stdout)?;
        let mut res = HashMap::<String, String>::default();

        for line in output.lines() {
            let sp = line.split(':').collect_vec();
            if sp.len() != 2 {
                continue;
            }

            res.insert(sp[0].to_string(), sp[1].to_string());
        }

        Ok(res)
    }
}
