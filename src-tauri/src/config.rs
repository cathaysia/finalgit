use std::collections::HashMap;

use tauri_derive::export_ts;

use crate::AppResult;

pub trait ConfigExt {
    async fn git_get_config(&self, key: &str) -> AppResult<String>;
    async fn git_set_config(&self, key: &str, value: &str) -> AppResult<()>;
    async fn git_get_configes(&self) -> AppResult<HashMap<String, String>>;
}

#[export_ts(scope = "config")]
impl ConfigExt for git2::Repository {
    async fn git_get_config(&self, key: &str) -> AppResult<String> {
        Ok(self.config()?.snapshot()?.get_str(key)?.into())
    }

    async fn git_set_config(&self, key: &str, value: &str) -> AppResult<()> {
        self.config()?.set_str(key, value)?;

        Ok(())
    }

    async fn git_get_configes(&self) -> AppResult<HashMap<String, String>> {
        let mut res = HashMap::<String, String>::default();
        self.config()?
            .snapshot()?
            .entries(None)?
            .for_each(|entry| {
                if let (Some(key), Some(value)) = (entry.name(), entry.value()) {
                    res.insert(key.to_string(), value.to_string());
                }
            })?;
        Ok(res)
    }
}

#[cfg(test)]
mod test {
    use super::*;

    #[tokio::test]
    async fn get_config() {
        let repo = crate::utils::open_repo("../").unwrap();
        repo.git_get_config("user.name").await.unwrap();
        repo.git_get_config("user.email").await.unwrap();
        repo.git_get_config("commit.gpgsign").await.unwrap();
    }
}
