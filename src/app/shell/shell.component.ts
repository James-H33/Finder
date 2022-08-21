import { Component, OnInit } from '@angular/core';
import { AppStateService } from '../services/app-state.service';
import { FileSystemService } from '../services/file-system.service';

@Component({
  selector: 'app-shell',
  templateUrl: './shell.component.html',
  styleUrls: ['./shell.component.scss']
})
export class ShellComponent implements OnInit {

  constructor(
    private appState: AppStateService,
    private fileSystem: FileSystemService
  ) { }

  public async ngOnInit() {
    const results = await this.fileSystem.readDir('');
    this.appState.update({ fileEntries: results } as any);
  }
}
