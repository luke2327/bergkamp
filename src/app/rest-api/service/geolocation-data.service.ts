import { Injectable } from '@angular/core';
import { Observable } from 'rxjs/Observable';
import { Subject } from 'rxjs/Subject';
@Injectable()
export class GeolocationDataService {

  getGeolocationObservable: any;

  constructor() {
    this.getGeolocationObservable = new Subject();
  }


  setGetGeolocation(data: any): void {
    this.getGeolocationObservable.next(data);
  }
}
