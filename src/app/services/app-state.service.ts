import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';
import { AppState } from '../models/app-state.model';

@Injectable({
  providedIn: 'root'
})
export class AppStateService {
  public state = new AppState();
  public state$: BehaviorSubject<AppState> = new BehaviorSubject(new AppState());

  public watch() {
    return this.state$.asObservable();
  }

  public update(state: AppState) {
    const newState = { ...this.state, ...state };

    this.state = newState;

    this.state$.next(this.state);
  }

}

