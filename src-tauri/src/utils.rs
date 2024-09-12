use crate::AppResult;

pub fn open_repo(repo_path: &str) -> AppResult<git2::Repository> {
    Ok(git2::Repository::open(repo_path)?)
}
