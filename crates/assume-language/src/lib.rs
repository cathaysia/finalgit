pub mod utils;

use std::path::Path;
use wasm_bindgen::prelude::*;

#[wasm_bindgen]
pub fn assume_language(file_name: &str) -> Option<String> {
    let path = Path::new(file_name);
    let file_name = path.file_name()?;
    let file_name = file_name.to_str()?;
    for (pat, ty) in LANGUAGE_DEFINES {
        if glob_match::glob_match(pat, file_name) {
            return Some(ty.to_string());
        }
    }
    None
}

static LANGUAGE_DEFINES: [(&str, &str); 26] = [
    ("*.tsx", "tsx"),
    ("*.html", "html"),
    ("*.js", "javascript"),
    ("*.mjs", "javascript"),
    ("*.jsx", "jsx"),
    ("*.md", "markdown"),
    ("*.json", "json"),
    ("*.jsonc", "json"),
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
    ("Cargo.lock", "toml"),
    ("*.toml", "toml"),
    ("*.yaml", "yaml"),
    ("*.yml", "yaml"),
    (".editorconfig", "toml"),
    (".gitignore", "gitignore"),
];

#[cfg(test)]
mod test {
    use super::*;

    #[test]
    fn test_ft() {
        let v = [("README.md", "markdown")];

        for (path, ty) in v {
            let lang = assume_language(path).unwrap();
            assert_eq!(lang, ty)
        }
    }
}
