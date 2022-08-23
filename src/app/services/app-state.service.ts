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

  public update(state: (s: AppState) => | AppState) {
    let myState = {};

    if (typeof state === 'function') {
      myState = state(this.state);
    } else {
      myState = { ...state as any };
    }

    const newState = { ...this.state, ...myState };

    this.state = newState;

    console.log(this.state);

    this.state$.next(this.state);
  }

}

