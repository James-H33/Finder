import { FileEntry } from "@tauri-apps/api/fs";

export class AppState {
  public currentDir: string = '';
  public pathToHome: string[] = [];
  public fileEntries: FileEntry[] = [];
}
