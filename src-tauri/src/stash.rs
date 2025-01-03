use tauri_derive::export_ts;

use crate::AppResult;

#[derive(Debug, serde::Serialize, serde::Deserialize, specta::Type)]
pub struct StashInfo {
    id: u32,
    message: String,
    oid: String,
}

pub trait StashExt {
    async fn stash_save(&mut self, message: Option<String>) -> AppResult<()>;
    async fn stash_apply(&mut self, index: u32) -> AppResult<()>;
    async fn stash_remove(&mut self, index: u32) -> AppResult<()>;
    async fn stash_list(&mut self) -> AppResult<Vec<StashInfo>>;
}

#[export_ts(scope = "stash")]
impl StashExt for git2::Repository {
    async fn stash_save(&mut self, message: Option<String>) -> AppResult<()> {
        let config = self.config()?.snapshot()?;
        let user = config.get_str("user.name")?;
        let email = config.get_str("user.email")?;

        let signature = git2::Signature::now(user, email)?;

        self.stash_save2(&signature, message.as_deref(), None)?;

        Ok(())
    }

    async fn stash_apply(&mut self, index: u32) -> AppResult<()> {
        self.stash_apply(index as usize, None)?;
        Ok(())
    }

    async fn stash_remove(&mut self, index: u32) -> AppResult<()> {
        self.stash_drop(index as usize)?;
        Ok(())
    }

    async fn stash_list(&mut self) -> AppResult<Vec<StashInfo>> {
        let mut infos = vec![];
        self.stash_foreach(|idx, message, id| {
            infos.push(StashInfo {
                id: idx as u32,
                message: message.into(),
                oid: id.to_string(),
            });
            true
        })?;

        Ok(infos)
    }
}
