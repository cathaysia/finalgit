use crate::AppResult;
use filetime::FileTime;
use tauri_derive::export_ts;

pub trait UtilExt {
    fn get_head_modify_time(repo_path: &str) -> AppResult<f64>;
    fn assume_language(file_name: &str) -> AppResult<Option<String>>;
}

#[export_ts(scope = "utils")]
impl UtilExt for git2::Repository {
    fn get_head_modify_time(repo_path: &str) -> AppResult<f64> {
        let path = std::path::Path::new(repo_path).canonicalize()?;

        if !path.exists() || !path.is_dir() {
            return Err(crate::AppError::NoRepo);
        }

        let meta = path.metadata()?;
        let mtime = FileTime::from_last_modification_time(&meta);

        Ok(mtime.seconds() as f64)
    }

    fn assume_language(file_name: &str) -> AppResult<Option<String>> {
        for (pat, ty) in LANGUAGE_DEFINES {
            if glob_match::glob_match(pat, file_name) {
                return Ok(Some(ty.to_string()));
            }
        }
        Ok(None)
    }
}

pub fn open_repo(repo_path: &str) -> AppResult<git2::Repository> {
    Ok(git2::Repository::open(repo_path)?)
}

static LANGUAGE_DEFINES: [(&str, &str); 18] = [
    ("*.tsx", "tsx"),
    ("*.html", "html"),
    ("*.js", "javascript"),
    ("*.jsx", "jsx"),
    ("*.md", "markdown"),
    ("*.json", "json"),
    ("*.py", "python"),
    ("*.ts", "typescript"),
    ("*.rs", "rust"),
    ("*.sql", "sql"),
    ("*.xml", "xml"),
    ("*.sass", "sass"),
    ("*.css", "css"),
    ("*.{c,h}", "c"),
    ("*.{cpp,hpp,cc,cxx}", "cpp"),
    ("*.{nix}", "nix"),
    ("*.svelte", "svelte"),
    ("*.vue", "vue"),
];

#[cfg(test)]
mod test {
    use super::*;

    #[test]
    fn test_ft() {
        let v = [("README.md", "markdown")];

        for (path, ty) in v {
            let lang = assume_language(path).unwrap().unwrap();
            assert_eq!(lang, ty)
        }
    }
}
