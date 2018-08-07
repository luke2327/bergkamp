import { Injectable } from '@angular/core';
import { Observable } from 'rxjs/Observable';
import { Subject } from 'rxjs/Subject';
import { AppState } from '../app.const';
@Injectable()
export class CompStateService {
  observable: any;

  constructor() {
    this.observable = new Subject();
  }

  startApp(): void {
    this.observable.next(AppState.StartApp);
  }

  startAppErr(): void {
    this.observable.next(AppState.StartAppErr);
  }

}
