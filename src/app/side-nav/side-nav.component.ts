import { Component, OnInit, ViewEncapsulation } from '@angular/core';
import { AppState } from '../models/app-state.model';
import { AppStateService } from '../services/app-state.service';

@Component({
  selector: 'app-side-nav',
  templateUrl: './side-nav.component.html',
  styleUrls: ['./side-nav.component.scss'],
  encapsulation: ViewEncapsulation.None
})
export class SideNavComponent implements OnInit {
  public recentDir: string[] = [
    "Home",
    "Arrow",
    "Document",
    "Work"
  ];

  public path: string[] = [];

  constructor(
    private state: AppStateService
  ) { }

  ngOnInit() {
    this.state.watch().subscribe(s => this.path = s.path)
  }
}
