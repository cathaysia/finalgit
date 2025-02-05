mod complex;
mod extensions;
mod literal;
pub mod utils;

use complex::{COMPLEX_COMPLEX, COMPLEX_ENDSWITH, COMPLEX_STARTSWITH};
use extensions::EXTENSIONS;
use literal::LITERAL;
use std::path::Path;
use wasm_bindgen::prelude::*;

#[wasm_bindgen]
pub fn resolve(file_name: &str, _content: Option<String>) -> Option<String> {
    let path = Path::new(file_name);
    if let Some(file_name) = path.file_name() {
        if let Some(ext) = file_name.to_str() {
            if let Some(ext) = LITERAL.get(ext) {
                return Some(ext.to_string());
            }
        }
    }

    if let Some(ext) = path.extension() {
        if let Some(ext) = ext.to_str() {
            if let Some(ext) = EXTENSIONS.get(ext) {
                return Some(ext.to_string());
            }
        }
    }

    for (re, ext) in COMPLEX_STARTSWITH.iter() {
        if re.find(file_name).is_some() {
            return Some(ext.to_string());
        }
    }

    for (re, ext) in COMPLEX_ENDSWITH.iter() {
        if re.find(file_name).is_some() {
            return Some(ext.to_string());
        }
    }

    for (re, ext) in COMPLEX_COMPLEX.iter() {
        if re.find(file_name).is_some() {
            return Some(ext.to_string());
        }
    }

    None
}

#[cfg(test)]
mod test {
    use super::*;

    #[test]
    fn test_ft() {
        let v = [
            ("README.md", "markdown"),
            ("src/lib.rs", "rust"),
            ("src/.editorconfig", "dosini"),
        ];

        for (path, ty) in v {
            let lang = resolve(path, None).unwrap();
            assert_eq!(lang, ty)
        }
    }
}
