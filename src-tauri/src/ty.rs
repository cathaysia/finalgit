use std::cmp::Ordering;

use specta::Type;

#[derive(Debug, Clone, PartialEq, Eq, serde::Serialize, serde::Deserialize, Type)]
pub enum FileTree {
    File(String),
    Dir { dir: String, files: Vec<FileTree> },
}

impl PartialOrd for FileTree {
    fn partial_cmp(&self, other: &Self) -> Option<Ordering> {
        Some(self.cmp(other))
    }
}

impl Ord for FileTree {
    fn cmp(&self, other: &Self) -> std::cmp::Ordering {
        match (self, other) {
            (FileTree::File(lhs), FileTree::File(rhs)) => lhs.cmp(rhs),
            (FileTree::File(_), FileTree::Dir { dir: _, files: _ }) => Ordering::Greater,
            (FileTree::Dir { dir: _, files: _ }, FileTree::File(_)) => Ordering::Less,
            (FileTree::Dir { dir: lhs, files: _ }, FileTree::Dir { dir: rhs, files: _ }) => {
                lhs.cmp(rhs)
            }
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
