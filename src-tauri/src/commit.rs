use crate::branch::RepoExt;
use crate::AppError;
use crate::AppResult;
use crate::BranchType;
use crate::CommitInfo;
use crate::Signature;
use git2::build::CheckoutBuilder;
use git2::Oid;
use git2::Sort;
use specta::Type;
use tauri_derive::export_ts;

#[derive(Debug, Clone, serde::Serialize, serde::Deserialize, Type)]
pub struct Commit {
    id: String,
    author: Signature,
    commiter: Signature,
    message: String,
    summary: String,
    body: Option<String>,
    time: u32,
}

impl TryFrom<&git2::Commit<'_>> for Commit {
    type Error = AppError;
    fn try_from(value: &git2::Commit) -> Result<Self, Self::Error> {
        Ok(Self {
            id: value.id().to_string(),
            commiter: (&value.committer()).try_into()?,
            author: (&value.author()).try_into()?,
            message: value.message().unwrap().to_string(),
            summary: value.summary().unwrap().to_string(),
            body: value.body().map(|item| item.to_string()),
            time: value.time().seconds() as u32,
        })
    }
}

pub trait CommitExt {
    fn commit_checkout(&self, commit: &str) -> AppResult<()>;
    fn checkout_file(&self, commit: &str, path: &str) -> AppResult<()>;
    fn commit_info(&self, commit: &str) -> AppResult<Commit>;
    fn commit_reset_author(&self, _commit: &str) -> AppResult<()>;
    fn commit_amend(&self, commit: &str) -> AppResult<()>;
    fn get_history(&self, commit: &str) -> AppResult<Vec<CommitInfo>>;
    fn create_commit(&self, msg: &str) -> AppResult<()>;
    fn get_commits(&self, branch: &str, kind: BranchType) -> AppResult<Vec<CommitInfo>>;
    fn create_patch(&self) -> AppResult<String>;
}

#[export_ts]
impl CommitExt for git2::Repository {
    fn commit_checkout(&self, commit: &str) -> AppResult<()> {
        let oid = Oid::from_str(commit)?;
        self.set_head_detached(oid)?;

        let mut opts = CheckoutBuilder::new();
        let opts = opts.safe().force();
        self.checkout_head(Some(opts))?;

        Ok(())
    }

    fn checkout_file(&self, commit: &str, path: &str) -> AppResult<()> {
        self.exec_git(["checkout", commit, path])?;

        Ok(())
    }

    fn commit_info(&self, commit: &str) -> AppResult<Commit> {
        let commit = self.find_commit(Oid::from_str(commit)?)?;

        (&commit).try_into()
    }

    fn commit_reset_author(&self, _commit: &str) -> AppResult<()> {
        self.exec_git(["commit", "--reset-author", "--amend", "--no-edit"])?;

        Ok(())
    }

    fn commit_amend(&self, commit: &str) -> AppResult<()> {
        let head = self.head()?.target().unwrap().to_string();
        if commit == head {
            self.exec_git(["commit", "--amend", "--no-edit"])?;
        } else {
            return Err(AppError::NotImplement);
        }

        Ok(())
    }

    fn get_history(&self, commit: &str) -> AppResult<Vec<CommitInfo>> {
        let commit = self.find_commit_by_prefix(commit)?;
        let mut revwalk = self.revwalk()?;
        revwalk.push(commit.id())?;
        revwalk.set_sorting(Sort::TIME)?;

        let mut res = vec![];
        for item in revwalk {
            let item = item?;
            let commit = self.find_commit(item)?;

            res.push(CommitInfo {
                oid: commit.id().to_string(),
                author: Signature {
                    name: commit.author().name().unwrap().to_string(),
                    email: commit.author().email().unwrap().to_string(),
                    time: commit.author().when().seconds() as u32,
                },
                commiter: Signature {
                    name: commit.committer().name().unwrap().to_string(),
                    email: commit.committer().email().unwrap().to_string(),
                    time: commit.committer().when().seconds() as u32,
                },
                message: commit.message().unwrap().to_string(),
                summary: commit.summary().unwrap().to_string(),
                time: commit.time().seconds() as u32,
            });
        }

        Ok(res)
    }

    fn create_commit(&self, msg: &str) -> AppResult<()> {
        let _ = self.exec_git(["commit", "-m", msg])?;

        Ok(())
    }

    fn get_commits(&self, branch: &str, kind: BranchType) -> AppResult<Vec<CommitInfo>> {
        let branch = self.find_branch(branch, kind.into())?;
        let oid = branch.get().target().unwrap();

        let mut walker = self.revwalk()?;
        walker.push(oid)?;
        walker.set_sorting(git2::Sort::TIME)?;

        let mut commits = vec![];
        for id in walker {
            let id = id?;
            let commit = self.find_commit(id)?;
            let author = Signature {
                name: commit.author().name().unwrap().into(),
                email: commit.author().email().unwrap().into(),
                time: commit.author().when().seconds() as u32,
            };
            let commiter = Signature {
                name: commit.committer().name().unwrap().into(),
                email: commit.committer().email().unwrap().into(),
                time: commit.author().when().seconds() as u32,
            };
            let info = commit.message().unwrap();
            let summary = commit.summary().unwrap();
            let oid = commit.id().to_string();
            let date = commit.time().seconds();
            commits.push(CommitInfo {
                oid,
                author,
                commiter,
                message: info.into(),
                summary: summary.into(),
                time: date as u32,
            });
        }

        Ok(commits)
    }

    fn create_patch(&self) -> AppResult<String> {
        let output = self.exec_git(["diff", "HEAD"])?;

        let out = String::from_utf8(output.stdout)?;
        Ok(out)
    }
}
