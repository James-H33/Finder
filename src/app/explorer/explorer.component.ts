import { Component, OnInit } from '@angular/core';
import { FileEntry } from '@tauri-apps/api/fs';
import { AppState } from '../models/app-state.model';
import { AppStateService } from '../services/app-state.service';
import { FileSystemService } from '../services/file-system.service';
import { filter } from 'rxjs';

@Component({
  selector: 'app-explorer',
  templateUrl: './explorer.component.html',
  styleUrls: ['./explorer.component.scss']
})
export class ExplorerComponent implements OnInit {
  public fileEntries: FileEntry[] = [];
  public path: string[] = [];

  constructor(
    private appState: AppStateService,
    private fileSystem: FileSystemService
  ) { }

  public ngOnInit() {
    this.appState.watch()
      .pipe(
        filter((s: AppState) => this.last(s.path) !== this.last(this.path))
      )
      .subscribe((s: AppState) => {
        console.log(s);
        this.update(s.path);
      });

      this.update(['']);
  }

  private last(val: any[]) {
    return val[val.length - 1];
  }

  public async update(path: string[]) {
    this.path = path;
    const joinedPath = this.path.join('/');
    const results = await this.fileSystem.readDir(joinedPath);
    this.fileEntries = results;
  }

  public async openDir(dirName?: string) {
    if (!dirName) {
      return;
    }

    this.appState.update((s: AppState) => {
      return {
        currentDir: dirName,
        path: [...s.path, dirName]
      }
    });
  }
}
