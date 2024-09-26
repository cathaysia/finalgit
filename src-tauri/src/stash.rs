use crate::ext::RepoExt;
use crate::utils;

use crate::AppResult;

#[derive(Debug, serde::Serialize, serde::Deserialize, specta::Type)]
pub struct StashInfo {
    id: u32,
    message: String,
    oid: String,
}

#[tauri::command]
#[specta::specta]
pub fn stash_save(repo_path: &str, message: Option<String>) -> AppResult<()> {
    let repo = utils::open_repo(repo_path)?;
    match message {
        Some(msg) => {
            let _ = repo.exec_git(["stash", &msg])?;
        }
        None => {
            let _ = repo.exec_git(["stash"])?;
        }
    }
    Ok(())
}

#[tauri::command]
#[specta::specta]
pub fn stash_apply(repo_path: &str, index: u32) -> AppResult<()> {
    let mut repo = utils::open_repo(repo_path)?;
    repo.stash_apply(index as usize, None)?;
    Ok(())
}

#[tauri::command]
#[specta::specta]
pub fn stash_remove(repo_path: &str, index: u32) -> AppResult<()> {
    let mut repo = utils::open_repo(repo_path)?;
    repo.stash_drop(index as usize)?;
    Ok(())
}

#[tauri::command]
#[specta::specta]
pub fn stash_list(repo_path: &str) -> AppResult<Vec<StashInfo>> {
    let mut repo = utils::open_repo(repo_path)?;
    let mut infos = vec![];
    repo.stash_foreach(|idx, message, id| {
        infos.push(StashInfo {
            id: idx as u32,
            message: message.into(),
            oid: id.to_string(),
        });
        true
    })?;

    Ok(infos)
}
