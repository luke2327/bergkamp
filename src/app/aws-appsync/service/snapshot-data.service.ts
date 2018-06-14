import { Injectable } from '@angular/core';
import { Observable } from 'rxjs/Observable';
import { Subject } from 'rxjs/Subject';
//subscription을 쫌더 이쁘게 바꿔보자.
@Injectable()
export class SnapshotDataService {
  queryObservable:any;

  constructor() {
    this.queryObservable = new Subject();
  }

  setSnapshot(data:any): void {
    this.queryObservable.next(data);
  }
}
