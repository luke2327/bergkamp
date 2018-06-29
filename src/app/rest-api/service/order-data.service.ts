import { Injectable } from '@angular/core';
import { Observable } from 'rxjs/Observable';
import { Subject } from 'rxjs/Subject';
/*
  주문관련 데이터 처리 service
  Observer 패턴을 rest-api에 적용하는 방법을 쫌 이쁘게 하기 위해
  다음과 같은 절차를 거친다.
  1. service에서 rest-api 호출후 dataservice로 전달
  2. dataservice에서 통지

  위와 같이 절차를 나누면 호출하는곳과 받아서 데이터 처리하는 곳을 분리할수 있다.
*/
@Injectable()
export class OrderDataService {

  postOrderObservable: any;
  getOrderMyObservable: any;
  putOrderObservable: any;
  deleteOrderObservable: any;

  constructor() {
    this.postOrderObservable = new Subject();
    this.getOrderMyObservable = new Subject();
    this.putOrderObservable = new Subject();
    this.deleteOrderObservable = new Subject();
  }

  setPostOrder(data:any): void {
    this.postOrderObservable.next(data);
  }

  setGetOrderMy(data:any): void {
    this.getOrderMyObservable.next(data);
  }

  setPutOrder(data:any): void {
    this.putOrderObservable.next(data);
  }

  setDeleteOrder(data:any): void {
    this.deleteOrderObservable.next(data);
  }
}
