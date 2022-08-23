import { Injectable } from "@angular/core";
import { copyFile, BaseDirectory, readDir, FileEntry } from '@tauri-apps/api/fs';

@Injectable({
  providedIn: 'root'
})
export class FileSystemService {
  private baseDirectoryPath = '';

  public async copyFile() {
    try {
      return await copyFile('my.txt', 'this.txt', { dir: BaseDirectory.Home });
    } catch (err) {
      console.log(err);
    }
  }

  public async readDir(path: string, options?: any): Promise<any> {
    try {
      const showAll = false;

      let results = await readDir(path, { dir: BaseDirectory.Home });
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

  private setBasePath(entries: FileEntry[]) {
    let currPathIndex = 0;
    let homePath = [];
    let mostSeenPath = '';
    let maxSeenCount = 0;
    let map: any = {};

    for (let i = 0; i < entries.length; i++) {
      let entry = entries[i];
      let path = entry.path;
      const pathItems = path.split('/');

      if (pathItems.length > currPathIndex) {
        let currPath = pathItems[currPathIndex];

        if (currPath in map) {
          map[currPath]++;
        } else {
          map[currPath] = 1;
        }

        if (map[currPath] > maxSeenCount) {
          maxSeenCount = map[currPath];
          mostSeenPath = currPath;
        }
      }

      if ((i === entries.length - 1) && maxSeenCount > 1) {
        homePath.push(mostSeenPath);
        mostSeenPath = '';
        maxSeenCount = 0;
        currPathIndex++;
        map = {};
        i = 0;
      }
    }

    const r = homePath.join('/');

    this.baseDirectoryPath = r;
  }
}
