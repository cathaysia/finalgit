use crate::ext::RepoExt;

use crate::AppResult;

#[derive(Debug, serde::Serialize, serde::Deserialize)]
pub struct StashInfo {
    id: usize,
    message: String,
    oid: String,
}

pub trait StashExt {
    fn stash(&self) -> AppResult<()>;
    fn stash_pop(&self) -> AppResult<()>;
    fn stash_list(&mut self) -> AppResult<Vec<StashInfo>>;
}

impl StashExt for git2::Repository {
    fn stash(&self) -> AppResult<()> {
        let _ = self.exec_git(["stash"])?;
        Ok(())
    }

    fn stash_pop(&self) -> AppResult<()> {
        let _ = self.exec_git(["stash", "pop"])?;
        Ok(())
    }

    fn stash_list(&mut self) -> AppResult<Vec<StashInfo>> {
        let mut infos = vec![];
        self.stash_foreach(|idx, message, id| {
            infos.push(StashInfo {
                id: idx,
                message: message.into(),
                oid: id.to_string(),
            });
            true
        })?;

        Ok(infos)
    }
}
