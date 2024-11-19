use thiserror::Error;

#[derive(Debug, Error)]
pub enum AppError {
    #[error("bad semver: {0}")]
    Semver(#[from] semver::Error),
    #[error("git error: {0}")]
    Git(#[from] git2::Error),
    #[error("io error: {0}")]
    Io(#[from] std::io::Error),
    #[error("no opend repo")]
    NoRepo,
    #[error("spawn git failed: {0}")]
    Spawn(String),
    #[error("Utf8 error: {0}")]
    Utf8(#[from] std::str::Utf8Error),
    #[error("Utf8 error: {0}")]
    StringUtf8(#[from] std::string::FromUtf8Error),
    #[error("Bad Git Status")]
    BadStatus,
    #[error("Not implement")]
    NotImplement,
    #[error("Don't support bare repo.")]
    BareRepo,
}

pub type AppResult<T> = Result<T, AppError>;

impl serde::Serialize for AppError {
    fn serialize<S>(&self, serializer: S) -> Result<S::Ok, S::Error>
    where
        S: serde::Serializer,
    {
        serializer.serialize_str(&self.to_string())
    }
}

impl specta::Type for AppError {
    fn inline(
        _type_map: &mut specta::TypeMap,
        _generics: specta::Generics,
    ) -> specta::datatype::DataType {
        specta::DataType::Primitive(specta::datatype::PrimitiveType::String)
    }
}
