// Prevents additional console window on Windows in release, DO NOT REMOVE!!
#![cfg_attr(not(debug_assertions), windows_subsystem = "windows")]
#![allow(unused_variables)]
#![allow(unused_mut)]
#![allow(unused_imports)]
#![allow(dead_code)]
use std::path::Path;

use actix_web::{App, HttpServer};
use git2::Repository;
use gitserver::server::branches;

const BIND_PORT: u16 = 8823;

#[tokio::main]
async fn main() {
    setup_log();

    let server = HttpServer::new(|| App::new().service(branches))
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
