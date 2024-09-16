use std::os::linux::fs::MetadataExt;

use crate::AppResult;

pub fn open_repo(repo_path: &str) -> AppResult<git2::Repository> {
    Ok(git2::Repository::open(repo_path)?)
}

#[tauri::command]
#[specta::specta]
pub fn get_head_modify_time(repo_path: &str) -> AppResult<f64> {
    let path = std::path::Path::new(repo_path);
    let path = path.join(".git").canonicalize()?;

    if !path.exists() || !path.is_dir() {
        return Err(crate::AppError::NoRepo);
    }

    let meta = path.metadata()?;

    Ok(meta.st_mtime() as f64)
}
