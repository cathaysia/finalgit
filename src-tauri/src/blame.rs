use git2::{BlameOptions, Oid};
use specta::Type;

use crate::Signature;
use std::path::Path;

use crate::{utils, AppError, AppResult};

#[derive(Debug, Clone, serde::Serialize, serde::Deserialize, Type)]
pub struct BlameHunk {
    pub final_commit_id: String,
    pub final_start_line: u32,
    pub lines: u32,
    pub signature: Signature,
}

impl TryFrom<&git2::BlameHunk<'_>> for BlameHunk {
    type Error = AppError;

    fn try_from(value: &git2::BlameHunk<'_>) -> Result<Self, Self::Error> {
        Ok(Self {
            final_commit_id: value.final_commit_id().to_string(),
            final_start_line: value.final_start_line() as _,
            lines: value.lines_in_hunk() as _,
            signature: (&value.final_signature()).try_into()?,
        })
    }
}

#[tauri::command]
#[specta::specta]
pub fn blame_of_file(repo_path: &str, commit: &str, path: &str) -> AppResult<Vec<BlameHunk>> {
    let repo = utils::open_repo(repo_path)?;
    let mut opt = BlameOptions::new();
    opt.newest_commit(Oid::from_str(commit)?);
    let blame = repo.blame_file(Path::new(path), Some(&mut opt))?;

    let mut res = Vec::with_capacity(blame.len());

    for hunk in blame.iter() {
        res.push(BlameHunk::try_from(&hunk)?);
    }

    Ok(res)
}
