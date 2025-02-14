use std::cmp::Ordering;

use specta::Type;

use crate::AppError;

#[derive(Debug, Clone, PartialEq, Eq, serde::Serialize, serde::Deserialize, Type)]
pub enum FileTree {
    File {
        filename: String,
        mode: i32,
    },
    Dir {
        dir: String,
        files: Vec<FileTree>,
        mode: i32,
    },
}

impl PartialOrd for FileTree {
    fn partial_cmp(&self, other: &Self) -> Option<Ordering> {
        Some(self.cmp(other))
    }
}

impl Ord for FileTree {
    fn cmp(&self, other: &Self) -> std::cmp::Ordering {
        match (self, other) {
            (
                FileTree::File {
                    filename: lhs,
                    mode: _,
                },
                FileTree::File {
                    filename: rhs,
                    mode: _,
                },
            ) => lhs.cmp(rhs),
            (
                FileTree::File {
                    filename: _,
                    mode: _,
                },
                FileTree::Dir {
                    dir: _,
                    files: _,
                    mode: _,
                },
            ) => Ordering::Greater,
            (
                FileTree::Dir {
                    dir: _,
                    files: _,
                    mode: _,
                },
                FileTree::File {
                    filename: _,
                    mode: _,
                },
            ) => Ordering::Less,
            (
                FileTree::Dir {
                    dir: lhs,
                    files: _,
                    mode: _,
                },
                FileTree::Dir {
                    dir: rhs,
                    files: _,
                    mode: _,
                },
            ) => lhs.cmp(rhs),
        }
    }
}

#[derive(Debug, Clone, serde::Serialize, serde::Deserialize, Type)]
pub struct TagInfo {
    pub name: String,
    pub oid: String,
    pub ref_hash: String,
}

#[derive(Debug, Clone, PartialEq, Eq, serde::Serialize, serde::Deserialize, Type)]
pub struct BranchInfo {
    pub remote: Option<String>,
    pub name: String,
    #[serde(with = "BranchTypeSerde")]
    #[specta(type=BranchType)]
    pub kind: git2::BranchType,
    pub oid: String,
    pub is_head: bool,
    pub upstream: Option<String>,
}

impl BranchInfo {
    pub fn is_local(&self) -> bool {
        matches!(self.kind, git2::BranchType::Local)
    }
}

impl PartialOrd for BranchInfo {
    fn partial_cmp(&self, other: &Self) -> Option<Ordering> {
        Some(self.cmp(other))
    }
}

impl Ord for BranchInfo {
    fn cmp(&self, other: &Self) -> Ordering {
        if self.is_head {
            return Ordering::Greater;
        }
        if other.is_head {
            return Ordering::Less;
        }

        match (self.kind, other.kind) {
            (git2::BranchType::Local, git2::BranchType::Remote) => return Ordering::Greater,
            (git2::BranchType::Remote, git2::BranchType::Local) => return Ordering::Less,
            _ => {}
        }

        self.name.cmp(&other.name)
    }
}

#[derive(Debug, Default, Copy, Clone, PartialEq, Eq, serde::Serialize, serde::Deserialize)]
#[serde(remote = "git2::BranchType")]
enum BranchTypeSerde {
    #[default]
    Local,
    Remote,
}

#[derive(Debug, Copy, Clone, PartialEq, Eq, serde::Serialize, serde::Deserialize, Type)]
pub enum BranchType {
    Local,
    Remote,
}

impl From<BranchType> for git2::BranchType {
    fn from(value: BranchType) -> Self {
        match value {
            BranchType::Local => Self::Local,
            BranchType::Remote => Self::Remote,
        }
    }
}

#[derive(Debug, serde::Serialize, Clone, PartialEq, Eq, serde::Deserialize, Type)]
pub struct FileStatus {
    pub path: String,
    pub status: u32,
}

#[derive(Debug, Clone, serde::Serialize, serde::Deserialize, Type)]
pub struct CommitInfo {
    pub oid: String,
    pub author: Signature,
    pub commiter: Signature,
    pub message: String,
    pub summary: String,
    pub body: Option<String>,
    pub time: u32,
}

impl TryFrom<&git2::Commit<'_>> for CommitInfo {
    type Error = AppError;
    fn try_from(value: &git2::Commit) -> Result<Self, Self::Error> {
        Ok(Self {
            oid: value.id().to_string(),
            commiter: (&value.committer()).try_into()?,
            author: (&value.author()).try_into()?,
            message: value.message().unwrap().to_string(),
            summary: value.summary().unwrap().to_string(),
            body: value.body().map(|item| item.to_string()),
            time: value.time().seconds() as u32,
        })
    }
}

#[derive(Debug, Clone, serde::Serialize, serde::Deserialize, Type)]
pub struct Signature {
    pub name: String,
    pub email: String,
    pub time: u32,
}

impl TryFrom<&git2::Signature<'_>> for Signature {
    type Error = AppError;

    fn try_from(value: &git2::Signature<'_>) -> Result<Self, Self::Error> {
        Ok(Self {
            name: value.name().unwrap().to_string(),
            email: value.email().unwrap().to_string(),
            time: value.when().seconds() as u32,
        })
    }
}
