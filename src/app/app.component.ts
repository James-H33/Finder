import { Component } from '@angular/core';
import { FileEntry } from '@tauri-apps/api/fs';
import { FileSystemService } from './services/file-system.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent {
  public fileEntries: FileEntry[] = [];

  constructor(
    private file: FileSystemService
  ) {}

  // public async onClick() {
  //   const result = await this.file.readDir();

    // const entries = result
    //   .filter((entry: FileEntry) => {
    //     const name = entry.name;
    //     return name && name[0] !== '.';
    //   });

    //   this.fileEntries = entries.sort((a: any, b: any) => a.name.localeCompare(b.name));
  // }
}
