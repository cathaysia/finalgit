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
    async fn remote_get_list(&self) -> AppResult<Vec<Remote>>;
    async fn remote_add(&self, name: &str, url: &str) -> AppResult<()>;
    async fn remote_set_url(&self, name: &str, url: &str) -> AppResult<()>;
    async fn remote_remove(&self, name: &str) -> AppResult<()>;
    async fn remote_rename(&self, name: &str, new_name: &str) -> AppResult<()>;
}

#[export_ts(scope = "remote")]
impl RemoteExt for git2::Repository {
    async fn remote_get_list(&self) -> AppResult<Vec<Remote>> {
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

    async fn remote_add(&self, name: &str, url: &str) -> AppResult<()> {
        let _ = self.remote(name, url)?;
        Ok(())
    }

    async fn remote_set_url(&self, name: &str, url: &str) -> AppResult<()> {
        self.remote_set_url(name, url)?;
        Ok(())
    }

    async fn remote_remove(&self, name: &str) -> AppResult<()> {
        self.remote_delete(name)?;
        Ok(())
    }

    async fn remote_rename(&self, name: &str, new_name: &str) -> AppResult<()> {
        let problems = self.remote_rename(name, new_name)?;
        let problem_list: Vec<&str> = problems.into_iter().flatten().collect();
        if !problem_list.is_empty() {
            return Err(crate::AppError::InvalidOperation(format!(
                "remote rename had unresolved refspecs: {}",
                problem_list.join(", ")
            )));
        }
        Ok(())
    }
}
