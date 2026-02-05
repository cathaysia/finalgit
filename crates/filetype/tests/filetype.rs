use filetype::resolve;

#[test]
fn test_ft() {
    let v = [
        ("README.md", "markdown"),
        ("src/lib.rs", "rust"),
        ("src/.editorconfig", "dosini"),
        ("/etc/man.conf", "manconf"),
        ("/Users/xxx/.config/tmux/tmux.conf", "tmux"),
        ("flake.nix", "nix"),
        ("flake.lock", "nix"),
    ];

    for (path, ty) in v {
        let lang = resolve(path, None).unwrap();
        assert_eq!(lang, ty)
    }
}
