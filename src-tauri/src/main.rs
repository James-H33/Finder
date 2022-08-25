#![cfg_attr(
  all(not(debug_assertions), target_os = "windows"),
  windows_subsystem = "windows"
)]


use tauri::api::{dir::{read_dir, DiskEntry}, path::home_dir};
use std::format;

#[derive(serde::Serialize)]
struct FileEntry {
  name: String,
  path: String,
  file_type: String
}

#[tauri::command]
fn app_read_dir(dir: String) -> Result<Vec<FileEntry>, String> {
  let home_res = home_dir();
  let base_path = home_res.unwrap();

  let path = format!("{}/{}", base_path.into_os_string().into_string().unwrap(), dir);

  let results = read_dir(path, false);
  let value = parse(&results.unwrap());

  if value.len() > 0 {
    Ok(value)
  } else {
    Err("No result".into())
  }
}

fn parse(entries: &Vec<DiskEntry>) -> Vec<FileEntry> {
  let mut new_results: Vec<FileEntry> = Vec::new();

  for entry in entries {
    let val = entry.clone();
    let name = val.name.clone().unwrap();
    let path = val.path.clone().into_os_string().into_string().unwrap();
    let file_type;

    if is_file(&name) {
      file_type = String::from("file")
   } else {
      file_type = String::from("dir");
    }

    new_results.push(FileEntry { name, path, file_type });
  }

  return new_results;
}

fn is_file(s: &str) -> bool {
  let chars = s.as_bytes();

  for (i, _) in chars.iter().enumerate() {

    if chars[i] == b'.' && i != 0 {
      return true;
    }
  }

  return false;
}

fn main() {
  tauri::Builder::default()
    .invoke_handler(tauri::generate_handler![app_read_dir])
    .run(tauri::generate_context!())
    .expect("error while running tauri application");
}
