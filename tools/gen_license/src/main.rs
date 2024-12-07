use clap::Parser;
use glob::glob;
use markdown::{to_mdast, Constructs, ParseOptions};
use serde::{Deserialize, Serialize};

#[derive(Parser)]
struct Args {
    /// Path to git@github.com:github/choosealicense.com.git
    repo: String,
    target: String,
}

#[derive(Debug, Deserialize, Serialize)]
struct Matter {
    title: String,
    permissions: Vec<String>,
    conditions: Vec<String>,
    limitations: Vec<String>,
}

fn main() {
    let args = Args::parse();

    for file in glob(&format!("{}/_licenses/*.txt", args.repo)).unwrap() {
        let file = file.unwrap();
        let content = std::fs::read_to_string(&file).unwrap();
        let opt = ParseOptions {
            constructs: Constructs {
                frontmatter: true,
                ..Default::default()
            },
            ..Default::default()
        };
        let file_name = file
            .file_name()
            .unwrap()
            .to_str()
            .unwrap()
            .replace(".txt", ".json");

        let ast = to_mdast(&content, &opt).unwrap();
        if let markdown::mdast::Node::Root(root) = ast {
            for i in root.children {
                if let markdown::mdast::Node::Yaml(yaml) = i {
                    let matter: Matter = serde_yaml::from_str(&yaml.value).unwrap();
                    let json = serde_json::to_string(&matter).unwrap();
                    std::fs::write(format!("{}/{file_name}", args.target), json).unwrap();
                }
            }
        }
    }
}
