// Prevents additional console window on Windows in release, DO NOT REMOVE!!
#![cfg_attr(not(debug_assertions), windows_subsystem = "windows")]
#![allow(unused_variables)]
#![allow(unused_mut)]
#![allow(unused_imports)]
#![allow(dead_code)]
use std::path::Path;

use actix_cors::Cors;
use actix_web::{middleware, App, HttpServer};
use git2::Repository;
use gitserver::{branch, diff, list, tag};

const BIND_PORT: u16 = 8823;

#[tokio::main]
async fn main() {
    setup_log();

    let server = HttpServer::new(|| {
        App::new()
            .service(branch::get_branch_info)
            .service(branch::remove_branch)
            .service(branch::set_remote_branch)
            .service(branch::rename_branch)
            .service(branch::get_commits)
            .service(tag::get_tags)
            .service(tag::remove_tag)
            .service(diff::changes)
            .service(list::get_tree)
            .wrap(Cors::permissive())
            .wrap(middleware::Compress::default())
    })
    .bind(("127.0.0.1", BIND_PORT))
    .unwrap();
    server.run().await.unwrap();
}

fn setup_log() {
    use tracing_subscriber::{fmt, layer::SubscriberExt, util::SubscriberInitExt, EnvFilter};

    tracing_subscriber::registry()
        .with(EnvFilter::from_default_env())
        .with(
            fmt::layer()
                .with_thread_names(true)
                .with_file(true)
                .with_line_number(true),
        )
        .init();
}
