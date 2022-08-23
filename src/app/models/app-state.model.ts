import { FileEntry } from "@tauri-apps/api/fs";

export class AppState {
  public currentDir: string = '';
  public path: string[] = [];
  // public fileEntries: FileEntry[] = [];
}
