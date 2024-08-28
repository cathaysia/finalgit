use thiserror::Error;

#[derive(Debug, Error)]
pub enum AppError {
    #[error("git error: {0}")]
    Git(#[from] git2::Error),
    #[error("io error: {0}")]
    Io(#[from] std::io::Error),
}

pub type GitResult<T> = Result<T, git2::Error>;
pub type AppResult<T> = Result<T, AppError>;

impl serde::Serialize for AppError {
    fn serialize<S>(&self, serializer: S) -> Result<S::Ok, S::Error>
    where
        S: serde::Serializer,
    {
        let errormsg = self.to_string();
        serializer.serialize_str(&errormsg)
    }
}
