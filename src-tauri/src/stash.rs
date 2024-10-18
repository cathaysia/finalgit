use tauri_derive::export_ts;

use crate::branch::RepoExt;

use crate::AppResult;

#[derive(Debug, serde::Serialize, serde::Deserialize, specta::Type)]
pub struct StashInfo {
    id: u32,
    message: String,
    oid: String,
}

pub trait StashExt {
    fn stash_save(&self, message: Option<String>) -> AppResult<()>;
    fn stash_apply(&mut self, index: u32) -> AppResult<()>;
    fn stash_remove(&mut self, index: u32) -> AppResult<()>;
    fn stash_list(&mut self) -> AppResult<Vec<StashInfo>>;
}

#[export_ts(scope = "stash")]
impl StashExt for git2::Repository {
    fn stash_save(&self, message: Option<String>) -> AppResult<()> {
        match message {
            Some(msg) => {
                let _ = self.exec_git(["stash", &msg])?;
            }
            None => {
                let _ = self.exec_git(["stash"])?;
            }
        }
        Ok(())
    }

    fn stash_apply(&mut self, index: u32) -> AppResult<()> {
        self.stash_apply(index as usize, None)?;
        Ok(())
    }

    fn stash_remove(&mut self, index: u32) -> AppResult<()> {
        self.stash_drop(index as usize)?;
        Ok(())
    }

    fn stash_list(&mut self) -> AppResult<Vec<StashInfo>> {
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
