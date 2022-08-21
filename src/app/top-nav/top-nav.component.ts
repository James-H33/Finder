import { Component, OnInit } from '@angular/core';
import { AppState } from '../models/app-state.model';
import { AppStateService } from '../services/app-state.service';

@Component({
  selector: 'app-top-nav',
  templateUrl: './top-nav.component.html',
  styleUrls: ['./top-nav.component.scss']
})
export class TopNavComponent implements OnInit {
  public currentDir = '/';

  constructor(
    private state: AppStateService
  ) { }

  public ngOnInit() {
    this.state.watch().subscribe((s: AppState) => {
      if (s.currentDir) {
        this.currentDir = s.currentDir;
      } else {
        this.currentDir = '/';
      }
    });
  }
}
