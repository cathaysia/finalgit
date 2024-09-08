use super::AppState;
use crate::{AppError, AppResult, Author, CommitInfo};

impl AppState {
    pub fn get_commits(&self, branch: &str, kind: git2::BranchType) -> AppResult<Vec<CommitInfo>> {
        let repo = self.git2.lock().unwrap();
        let repo = repo.as_ref().ok_or(AppError::NoRepo)?;

        let branch = repo.find_branch(branch, kind)?;
        let oid = branch.get().target().unwrap();

        let mut walker = repo.revwalk()?;
        walker.push(oid)?;
        walker.set_sorting(git2::Sort::TIME)?;

        let mut commits = vec![];
        for id in walker {
            let id = id?;
            let commit = repo.find_commit(id)?;
            let author = Author {
                name: commit.author().name().unwrap().into(),
                email: commit.author().email().unwrap().into(),
            };
            let commiter = Author {
                name: commit.committer().name().unwrap().into(),
                email: commit.committer().email().unwrap().into(),
            };
            let info = commit.message().unwrap();
            let summary = commit.summary().unwrap();
            let hash = commit.id().to_string();
            let date = commit.time().seconds();
            commits.push(CommitInfo {
                hash,
                author,
                commiter,
                message: info.into(),
                summary: summary.into(),
                time: date as u32,
            });
        }

        Ok(commits)
    }
}
