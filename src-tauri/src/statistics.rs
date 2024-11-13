use std::{collections::HashMap, str::FromStr};

use chrono::prelude::*;
use git2::Sort;
use itertools::Itertools;
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
        revwalk.set_sorting(Sort::TIME)?;
        for oid in revwalk {
            let Ok(oid) = oid else { continue };
            let Ok(commit) = self.find_commit(oid) else {
                continue;
            };

            if commit.author().name() != Some(author) {
                continue;
            }
            let utctime = {
                let time = commit.time();
                time.seconds() + time.offset_minutes() as i64 * 60
            };
            let date = DateTime::from_timestamp(utctime, 0).unwrap();
            let date = Utc
                .with_ymd_and_hms(date.year(), date.month(), date.day(), 0, 0, 0)
                .unwrap();
            let date = date.timestamp();

            statistics
                .entry(date as u32)
                .and_modify(|item| *item += 1)
                .or_insert(1);
        }

        let mut v = statistics
            .into_iter()
            .map(|item| CommitStatistics {
                date: item.0,
                count: item.1,
            })
            .collect_vec();
        v.sort_by(|a, b| a.date.cmp(&b.date));

        Ok(v)
    }
}

#[cfg(test)]
mod test {
    use super::StatisticsExt;

    #[test]
    fn test_time() {
        let time = git2::Repository::open("..").unwrap();
        time.statistics_commits_of_author("loongtao.zhang").unwrap();
    }
}
