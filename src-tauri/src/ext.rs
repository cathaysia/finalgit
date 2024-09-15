use std::{path::Path, process::Stdio};

use git2::ObjectType;
use itertools::Itertools;
use log::debug;

use crate::{AppError, AppResult, Author, BranchInfo, CommitInfo, FileStatus, FileTree, TagInfo};

pub trait RepoExt {
    fn get_branches(&self) -> AppResult<Vec<BranchInfo>>;

    fn rename_branch(&self, info: BranchInfo, to: &str) -> AppResult<()>;

    fn remove_branch(&self, info: BranchInfo) -> AppResult<()>;

    fn create_branch(&self, name: &str, commit: &str) -> AppResult<()>;

    /// https://stackoverflow.com/a/46758861
    fn checkout_branch(&self, name: &str) -> AppResult<()>;
    fn get_commits(&self, branch: &str, kind: git2::BranchType) -> AppResult<Vec<CommitInfo>>;
    fn get_current_status(&self) -> AppResult<Vec<FileStatus>>;
    fn get_file_tree(&self, commit: &str) -> AppResult<Vec<FileTree>>;
    fn get_file_content(&self, commit: &str, path: &str) -> AppResult<Vec<u8>>;
    fn get_tags(&self) -> AppResult<Vec<TagInfo>>;
    fn add_to_stage(&self, files: &[&str]) -> AppResult<()>;
    fn remove_from_stage(&self, files: &[&str]) -> AppResult<()>;
    fn create_commit(&self, msg: &str) -> AppResult<()>;
}

impl RepoExt for git2::Repository {
    fn get_branches(&self) -> AppResult<Vec<BranchInfo>> {
        let mut branches = vec![];

        for (branch, kind) in self.branches(None)?.flatten() {
            let branch_name = branch.name()?.unwrap();
            let branch_head = branch.get().resolve()?.target().unwrap().to_string();
            let is_head = branch.is_head();
            let upstream = branch
                .upstream()
                .map(|item| {
                    item.name()
                        .ok()
                        .map(|item| item.map(|item| item.to_string()))
                })
                .ok()
                .flatten()
                .flatten();

            let branch = match kind {
                git2::BranchType::Local => BranchInfo {
                    remote: None,
                    name: branch_name.into(),
                    kind,
                    commit: branch_head,
                    is_head,
                    upstream,
                },
                git2::BranchType::Remote => {
                    let (remote, branch) = match branch_name.split_once('/') {
                        Some((remote, branch)) => (Some(remote), branch),
                        None => unreachable!(),
                    };
                    if branch == "HEAD" {
                        continue;
                    }
                    BranchInfo {
                        remote: remote.map(|item| item.into()),
                        name: branch.into(),
                        kind,
                        commit: branch_head,
                        is_head,
                        upstream,
                    }
                }
            };
            branches.push(branch)
        }

        Ok(branches)
    }

    fn rename_branch(&self, info: BranchInfo, to: &str) -> AppResult<()> {
        let mut branch = self.find_branch(&info.name, info.kind)?;
        let _ = branch.rename(to, true)?;
        Ok(())
    }

    fn remove_branch(&self, info: BranchInfo) -> AppResult<()> {
        let mut branch = self.find_branch(&info.name, info.kind)?;
        branch.delete()?;

        Ok(())
    }

    fn create_branch(&self, name: &str, commit: &str) -> AppResult<()> {
        let commit = self.find_commit_by_prefix(commit)?;

        let _ = self.branch(name, &commit, true)?;

        Ok(())
    }

    /// https://stackoverflow.com/a/46758861
    fn checkout_branch(&self, name: &str) -> AppResult<()> {
        let branch = self.revparse_single(name)?;
        self.checkout_tree(&branch, None)?;
        self.set_head(&format!("refs/heads/{name}"))?;

        Ok(())
    }

    fn get_commits(&self, branch: &str, kind: git2::BranchType) -> AppResult<Vec<CommitInfo>> {
        let branch = self.find_branch(branch, kind)?;
        let oid = branch.get().target().unwrap();

        let mut walker = self.revwalk()?;
        walker.push(oid)?;
        walker.set_sorting(git2::Sort::TIME)?;

        let mut commits = vec![];
        for id in walker {
            let id = id?;
            let commit = self.find_commit(id)?;
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

    fn get_current_status(&self) -> AppResult<Vec<FileStatus>> {
        let status = self
            .statuses(None)?
            .into_iter()
            .filter_map(|item| {
                let path = item.path().unwrap();
                let status = item.status();

                if status.contains(git2::Status::IGNORED) {
                    return None;
                }

                Some(FileStatus {
                    path: path.into(),
                    status: status.bits(),
                })
            })
            .collect_vec();

        Ok(status)
    }
    fn get_file_tree(&self, commit: &str) -> AppResult<Vec<FileTree>> {
        let id = git2::Oid::from_str(commit)?;

        let commit = self.find_commit(id)?;
        let tree = commit.tree()?;
        let mut files = vec![];
        for item in tree.into_iter() {
            if let Some(item) = walk_cb(self, item) {
                files.push(item);
            }
        }
        files.sort();
        Ok(files)
    }

    fn get_file_content(&self, commit: &str, path: &str) -> AppResult<Vec<u8>> {
        let commit = git2::Oid::from_str(commit)?;
        let commit = self.find_commit(commit)?;
        let tree = commit.tree()?;
        let entry = tree.get_path(Path::new(path))?;
        let entry = self.find_blob(entry.id())?;

        Ok(entry.content().to_vec())
    }

    fn get_tags(&self) -> AppResult<Vec<TagInfo>> {
        let mut taginfos = vec![];
        self.tag_foreach(|oid, name| {
            let name = std::str::from_utf8(name)
                .unwrap()
                .strip_prefix("refs/tags/")
                .unwrap()
                .to_string();
            let commit = oid.to_string();
            taginfos.push(TagInfo { name, commit });
            true
        })?;

        Ok(taginfos)
    }

    fn add_to_stage(&self, files: &[&str]) -> AppResult<()> {
        let mut index = self.index()?;
        for item in files {
            index.add_path(std::path::Path::new(item))?
        }
        index.write()?;
        Ok(())
    }

    fn remove_from_stage(&self, files: &[&str]) -> AppResult<()> {
        let head = self.head()?.target().ok_or(AppError::NoRepo)?;
        let obj = self.find_object(head, Some(ObjectType::Commit))?;
        self.reset_default(Some(&obj), files)?;
        Ok(())
    }

    fn create_commit(&self, msg: &str) -> AppResult<()> {
        let path = self.path().parent().unwrap();

        let output = std::process::Command::new("git")
            .stdout(Stdio::null())
            .stderr(Stdio::piped())
            .env("GIT_TERMINAL_PROMPT", "0")
            .arg("commit")
            .arg("-m")
            .arg(msg)
            .current_dir(path)
            .spawn()?
            .wait_with_output()?;

        if output.status.code().unwrap() != 0 {
            let err = std::str::from_utf8(&output.stderr)?;
            return Err(AppError::Spawn(err.to_string()));
        }
        Ok(())
    }
}

fn walk_cb(repo: &git2::Repository, item: git2::TreeEntry) -> Option<FileTree> {
    match item.kind() {
        None => todo!(),
        Some(kind) => {
            //
            match kind {
                git2::ObjectType::Tree => {
                    let tree = item.to_object(repo).unwrap();
                    let tree = tree.peel_to_tree().unwrap();
                    let mut files = vec![];
                    for item in tree.into_iter() {
                        if let Some(item) = walk_cb(repo, item) {
                            files.push(item);
                        }
                    }
                    files.sort();
                    Some(FileTree::Dir {
                        dir: item.name().unwrap().to_string(),
                        files,
                        mode: item.filemode(),
                    })
                }
                git2::ObjectType::Blob => Some(FileTree::File {
                    filename: item.name().unwrap().to_string(),
                    mode: item.filemode(),
                }),
                _ => {
                    debug!("unknown object: {kind:#?}");
                    None
                }
            }
        }
    }
}
