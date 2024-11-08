use itertools::Itertools;
use specta::Type;
use tauri_derive::export_ts;

use crate::AppResult;

#[derive(Debug, Clone, PartialEq, Eq, serde::Serialize, serde::Deserialize, Type)]
pub struct Remote {
    name: String,
    url: String,
}
pub trait RemoteExt {
    fn remote_get_list(&self) -> AppResult<Vec<Remote>>;
    fn remote_add(&self, name: &str, url: &str) -> AppResult<()>;
    fn remote_set_url(&self, name: &str, url: &str) -> AppResult<()>;
}

#[export_ts(scope = "remote")]
impl RemoteExt for git2::Repository {
    fn remote_get_list(&self) -> AppResult<Vec<Remote>> {
        let remote = self.remotes()?;
        Ok(remote
            .into_iter()
            .flatten()
            .filter_map(|item| {
                self.find_remote(item)
                    .ok()
                    .and_then(|item| match (item.name(), item.url()) {
                        (Some(name), Some(url)) => Some(Remote {
                            name: name.to_string(),
                            url: url.to_string(),
                        }),
                        _ => None,
                    })
            })
            .collect_vec())
    }

    fn remote_add(&self, name: &str, url: &str) -> AppResult<()> {
        let _ = self.remote(name, url)?;
        Ok(())
    }

    fn remote_set_url(&self, name: &str, url: &str) -> AppResult<()> {
        self.remote_set_url(name, url)?;
        Ok(())
    }
}
