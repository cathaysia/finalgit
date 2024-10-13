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

#[proc_macro_attribute]
pub fn export_ts(_attr: TokenStream, input: TokenStream) -> TokenStream {
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
        signature
            .inputs
            .clone()
            .into_iter()
            .skip(1)
            .for_each(|item| {
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

        res.extend(quote! {
            #[tauri::command]
            #[specta::specta]
            pub fn #name(repo_path: &str, #args)  #ret {
                #[allow(unused_mut)]
                let mut repo = crate::utils::open_repo(repo_path)?;

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
