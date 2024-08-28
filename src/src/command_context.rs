use itertools::Itertools;
use tracing::trace;

use crate::GitResult;

pub struct CommandContext {
    pub repo: git2::Repository,
}

#[derive(Debug, Clone, Hash, PartialEq, Eq, serde::Serialize, serde::Deserialize)]
pub struct RefName {
    remote: String,
    branch: String,
}

impl CommandContext {
    pub fn remote_branches(&self) -> GitResult<Vec<RefName>> {
        Ok(self
            .repo
            .branches(Some(git2::BranchType::Remote))?
            .flatten()
            .filter_map(|(branch, _)| {
                let refname = branch.name().unwrap().unwrap();
                trace!(%refname);
                let (remote, branch) = refname.split_once('/').unwrap();
                Some(RefName {
                    remote: remote.to_string(),
                    branch: branch.to_string(),
                })
            })
            .collect_vec())
    }
}
