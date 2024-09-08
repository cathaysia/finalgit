use std::cmp::Ordering;

use specta::Type;

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
    pub commit: String,
}

#[derive(Debug, Clone, PartialEq, Eq, serde::Serialize, serde::Deserialize, Type)]
pub struct BranchInfo {
    pub remote: Option<String>,
    pub name: String,
    #[serde(with = "BranchType")]
    #[specta(type=BranchTypeRef)]
    pub kind: git2::BranchType,
    pub commit: String,
    pub is_head: bool,
    pub upstream: Option<String>,
}

#[derive(Debug, Default, Copy, Clone, PartialEq, Eq, serde::Serialize, serde::Deserialize)]
#[serde(remote = "git2::BranchType")]
enum BranchType {
    #[default]
    Local,
    Remote,
}

#[derive(Type)]
enum BranchTypeRef {
    Local,
    Remote,
}

#[derive(Debug, serde::Serialize, Clone, PartialEq, Eq, serde::Deserialize, Type)]
pub struct FileStatus {
    pub path: String,
    pub status: u32,
}