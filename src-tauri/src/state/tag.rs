use crate::{AppError, AppResult, AppState, TagInfo};

impl AppState {
    pub fn get_tags(&self) -> AppResult<Vec<TagInfo>> {
        let repo = self.git2.lock().unwrap();
        let repo = repo.as_ref().ok_or(AppError::NoRepo)?;

        let mut taginfos = vec![];
        repo.tag_foreach(|oid, name| {
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
}
