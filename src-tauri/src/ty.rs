use specta::Type;

#[derive(Debug, Clone, serde::Serialize, serde::Deserialize, Type)]
pub enum FileTree {
    File(String),
    Dir { dir: String, files: Vec<FileTree> },
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
