// Prevents additional console window on Windows in release, DO NOT REMOVE!!
#![cfg_attr(not(debug_assertions), windows_subsystem = "windows")]
#![allow(unused_variables)]
#![allow(unused_mut)]
#![allow(unused_imports)]
#![allow(dead_code)]
pub mod action;
pub mod branch;
pub mod checkout;
pub mod common;
pub mod diff;
pub mod error;
pub mod list;
pub mod tag;

pub use error::*;
