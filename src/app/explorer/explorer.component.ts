import { Component, OnInit } from '@angular/core';
import { FileEntry } from '@tauri-apps/api/fs';
import { AppState } from '../models/app-state.model';
import { AppStateService } from '../services/app-state.service';
import { FileSystemService } from '../services/file-system.service';

@Component({
  selector: 'app-explorer',
  templateUrl: './explorer.component.html',
  styleUrls: ['./explorer.component.scss']
})
export class ExplorerComponent implements OnInit {
  public fileEntries: FileEntry[] = [];

  constructor(
    private appState: AppStateService,
    private fileSystem: FileSystemService
  ) { }

  public ngOnInit() {
    this.appState.watch()
      .subscribe((state: AppState) => {
        this.fileEntries = state.fileEntries;
      });
  }

  public async openDir(dirName?: string) {
    if (!dirName) {
      return;
    }

    const results = await this.fileSystem.readDir(dirName);

    this.appState.update({
      fileEntries: results,
      currentDir: dirName
    } as AppState);
  }
}
