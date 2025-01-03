use std::collections::HashMap;

use tauri_derive::export_ts;

use crate::AppResult;

pub trait ConfigExt {
    async fn config_get(&self, key: &str) -> AppResult<String>;
    async fn config_set(&self, key: &str, value: &str) -> AppResult<()>;
    async fn config_get_all(&self) -> AppResult<HashMap<String, String>>;
}

#[export_ts(scope = "config")]
impl ConfigExt for git2::Repository {
    async fn config_get(&self, key: &str) -> AppResult<String> {
        Ok(self.config()?.snapshot()?.get_str(key)?.into())
    }

    async fn config_set(&self, key: &str, value: &str) -> AppResult<()> {
        self.config()?.set_str(key, value)?;

        Ok(())
    }

    async fn config_get_all(&self) -> AppResult<HashMap<String, String>> {
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
        repo.config_get("user.name").await.unwrap();
        repo.config_get("user.email").await.unwrap();
        repo.config_get("commit.gpgsign").await.unwrap();
    }
}
