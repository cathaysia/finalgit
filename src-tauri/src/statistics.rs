use std::collections::HashMap;

use serde::{Deserialize, Serialize};
use specta::Type;
use tauri_derive::export_ts;

use crate::AppResult;

#[derive(Debug, Serialize, Deserialize, Type)]
pub struct CommitStatistics {
    date: u32,
    count: u32,
}

pub trait StatisticsExt {
    fn statistics_commits_of_author(&self, author: &str) -> AppResult<Vec<CommitStatistics>>;
}

#[export_ts(scope = "statistics")]
impl StatisticsExt for git2::Repository {
    fn statistics_commits_of_author(&self, author: &str) -> AppResult<Vec<CommitStatistics>> {
        let mut statistics = HashMap::new();
        let mut revwalk = self.revwalk()?;
        revwalk.push_head()?;
        for oid in revwalk {
            let Ok(oid) = oid else { continue };
            let Ok(commit) = self.find_commit(oid) else {
                continue;
            };

            if commit.author().name() == Some(author) {
                statistics
                    .entry(commit.time().seconds() as u32)
                    .and_modify(|item| *item += 1)
                    .or_insert(1);
            }
        }

        Ok(statistics
            .into_iter()
            .map(|item| CommitStatistics {
                date: item.0,
                count: item.1,
            })
            .collect())
    }
}
