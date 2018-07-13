import { Injectable } from '@angular/core';
import { Observable } from 'rxjs/Observable';
import { Subject } from 'rxjs/Subject';
/*
info 관련 rest api
*/
@Injectable()
export class InfoDataService {

  getInfoAllObservable: any;
  constructor() {
    this.getInfoAllObservable = new Subject();
  }

  setInfoAll(data: any): void {
    this.getInfoAllObservable.next(data);
  }

}
