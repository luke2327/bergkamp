import { Injectable } from '@angular/core';
import { Observable } from 'rxjs/Observable';
import { Subject } from 'rxjs/Subject';
@Injectable()
export class FavoriteDataService {

  getFavoriteObservable: any;
  putFavoriteObservable: any;

  constructor() {
    this.getFavoriteObservable = new Subject();
    this.putFavoriteObservable = new Subject();
  }

  setGetFavorite(data:any): void {
    this.getFavoriteObservable.next(data);
  }

  setPutFavorite(data:any): void {
    this.putFavoriteObservable.next(data);
  }
}
