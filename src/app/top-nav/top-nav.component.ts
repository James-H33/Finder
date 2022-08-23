import { Component, OnInit } from '@angular/core';
import { AppState } from '../models/app-state.model';
import { AppStateService } from '../services/app-state.service';

@Component({
  selector: 'app-top-nav',
  templateUrl: './top-nav.component.html',
  styleUrls: ['./top-nav.component.scss']
})
export class TopNavComponent implements OnInit {
  public currentDir = 'home';
  public path: string[] = [];

  constructor(
    private state: AppStateService
  ) { }

  public ngOnInit() {
    this.state.watch().subscribe((s: AppState) => {
      this.path = s.path;

      if (s.currentDir) {
        this.currentDir = s.currentDir;
      } else {
        this.currentDir = 'home';
      }
    });
  }

  public async toRoot() {
    this.state.update((s: AppState) => {
      return {
        ...s,
        currentDir: '',
        path: []
      }
    });
  }

  public async navigateTo(pathname: string) {
    let path = this.path.slice();
    let currPath: any = null;

    while (currPath !== pathname) {
      currPath = path.pop();
    }

    path.push(currPath);

    this.state.update((s: AppState) => {
      return {
        ...s,
        currentDir: currPath,
        path
      }
    });
  }
}
