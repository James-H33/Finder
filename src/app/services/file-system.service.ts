import { Injectable } from "@angular/core";
import { copyFile, BaseDirectory, readDir, FileEntry } from '@tauri-apps/api/fs';

@Injectable({
  providedIn: 'root'
})
export class FileSystemService {
  constructor(
  ) {}

  public async copyFile() {
    try {
      return await copyFile('my.txt', 'this.txt', { dir: BaseDirectory.Home });
    } catch (err) {
      console.log(err);
    }
  }

  public async readDir(name: string, options?: any): Promise<any> {
    try {
      const showAll = false;

      let results = await readDir(name, { dir: BaseDirectory.Home });
      results = results.sort((a: any, b: any) => a.name.localeCompare(b.name));

      if (showAll) {
        return results;
      }

      results = results
        .filter((entry: FileEntry) => {
          const name = entry.name;
          return name && name[0] !== '.';
        });

      return results;
    } catch (err) {
      console.log(err);
    }
  }
}
