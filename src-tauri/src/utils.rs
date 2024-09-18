use crate::AppResult;
use filetime::FileTime;

pub fn open_repo(repo_path: &str) -> AppResult<git2::Repository> {
    Ok(git2::Repository::open(repo_path)?)
}

#[tauri::command]
#[specta::specta]
pub fn get_head_modify_time(repo_path: &str) -> AppResult<f64> {
    let path = std::path::Path::new(repo_path).canonicalize()?;

    if !path.exists() || !path.is_dir() {
        return Err(crate::AppError::NoRepo);
    }

    let meta = path.metadata()?;
    let mtime = FileTime::from_last_modification_time(&meta);

    Ok(mtime.seconds() as f64)
}
