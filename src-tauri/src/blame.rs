use git2::{BlameOptions, Oid};
use specta::Type;
use tauri_derive::export_ts;

use crate::Signature;
use std::path::Path;

use crate::{AppError, AppResult};

pub trait BlameExt {
    fn blame_of_file(&self, commit: &str, path: &str) -> AppResult<Vec<BlameHunk>>;
}

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

#[export_ts]
impl BlameExt for git2::Repository {
    fn blame_of_file(&self, commit: &str, path: &str) -> AppResult<Vec<BlameHunk>> {
        let mut opt = BlameOptions::new();
        opt.newest_commit(Oid::from_str(commit)?);
        let blame = self.blame_file(Path::new(path), Some(&mut opt))?;

        let mut res = Vec::with_capacity(blame.len());

        for hunk in blame.iter() {
            res.push(BlameHunk::try_from(&hunk)?);
        }

        Ok(res)
    }
}
