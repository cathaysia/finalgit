use std::sync::RwLock;

use darling::FromMeta;
use proc_macro::TokenStream;
use quote::quote;

use quote::ToTokens;
use syn::parse_macro_input;
use syn::ItemImpl;

/// Parse a `proc_macro::TokenStream` into a type that implements [`FromMeta`],
/// immediately returning a compile error if the tokens fail to parse.
///
/// # Example
/// ```rust,ignore
/// #[derive(Debug, Default, FromMeta)]
/// #[darling(default)]
/// pub struct Receiver {
///     pub default: bool,
/// }
///
/// #[proc_macro_attribute]
/// pub fn parse_attr(attr: TokenStream, input: TokenStream) -> TokenStream {
///     let options = parse_meta!(attr as Receiver);
///     input
/// }
/// ```
#[allow(unused)]
macro_rules! parse_meta {
    ($attr:ident as $ty:ty) => {
        match darling::ast::NestedMeta::parse_meta_list($attr.into()) {
            Ok(v) => match <$ty as darling::FromMeta>::from_list(&v) {
                Ok(v) => v,
                Err(e) => {
                    return proc_macro::TokenStream::from(e.write_errors());
                }
            },
            Err(e) => {
                return proc_macro::TokenStream::from(darling::Error::from(e).write_errors());
            }
        }
    };
    ($attr:ident) => {
        $crate::parse_meta!($attr as _)
    };
}

static FUNCS: RwLock<Vec<String>> = RwLock::new(Vec::new());

#[derive(Debug, Default, darling::FromMeta)]
#[darling(default)]
struct TSAttr {
    pub scope: String,
}

#[proc_macro_attribute]
pub fn export_ts(attr: TokenStream, input: TokenStream) -> TokenStream {
    let attr = parse_meta!(attr as TSAttr);

    let input = parse_macro_input!(input as ItemImpl);
    let input_bak = input.clone();

    let mut res = quote! {};

    for item in input.items {
        let syn::ImplItem::Fn(func) = item else {
            continue;
        };

        if func.sig.ident == "exec_git" {
            continue;
        }

        let signature = &func.sig;
        let name = signature.ident.clone();

        let has_mut = signature
            .inputs
            .clone()
            .to_token_stream()
            .to_string()
            .contains("&mut self");

        let mut args = quote! {};
        let mut has_self = false;
        signature.inputs.clone().into_iter().for_each(|item| {
            if item.to_token_stream().to_string().contains("self") {
                has_self = true;
                return;
            }

            args.extend(quote! {
                #item,
            });
        });

        let ret = signature.output.clone();

        let mut body = quote! {};
        func.block.stmts.clone().into_iter().for_each(|item| {
            let mut item = item.to_token_stream().to_string().replace("self.", "repo.");
            if has_mut {
                item = item.replace("self,", "&mut repo,");
            } else {
                item = item.replace("self,", "&repo,");
            }

            let item = if item.ends_with(';') {
                syn::parse_str::<syn::Stmt>(&item).unwrap()
            } else {
                let item = syn::parse_str::<syn::Expr>(&item).unwrap();
                syn::Stmt::Expr(item, None)
            };

            body.extend(quote! {
                #item
            });
        });

        FUNCS
            .write()
            .unwrap()
            .push(format!("{}::{}", attr.scope, name));

        let (args, open_repo) = if has_self {
            (
                quote! {repo_path:&str, #args},
                quote! {
                    #[allow(unused_mut)]
                    let mut repo = crate::utils::open_repo(repo_path)?;
                },
            )
        } else {
            (quote! {#args}, quote! {})
        };

        res.extend(quote! {
            #[tauri::command]
            #[specta::specta]
            pub fn #name(#args)  #ret {
                #open_repo

                #body
            }
        });
    }

    quote! {
        #input_bak

        #res
    }
    .into()
}

#[proc_macro]
pub fn specta_commands(_input: TokenStream) -> TokenStream {
    let mut args = quote! {};
    FUNCS.read().unwrap().iter().for_each(|item| {
        let ident = syn::TypePath::from_string(item).unwrap();
        args.extend(quote! { #ident, });
    });

    quote! {
        tauri_specta::collect_commands![ #args ]
    }
    .into()
}

#[proc_macro]
pub fn tauri_commands(_input: TokenStream) -> TokenStream {
    let mut args = quote! {};
    FUNCS.read().unwrap().iter().for_each(|item| {
        let ident = syn::TypePath::from_string(item).unwrap();
        args.extend(quote! { #ident, });
    });

    quote! {
        tauri::generate_handler![ #args ]
    }
    .into()
}
