import { Injectable } from '@angular/core';
import { Observable } from 'rxjs/Observable';
import { Subject } from 'rxjs/Subject';
/*
  login 버튼으로 상단메뉴 변경되는 로직 개발용 service
  sprint 3 이전에는 이 service를 이용한다.
*/
@Injectable()
export class SampleLoginService {
  observable: any;
  isLogin: boolean;

  constructor() {
    this.observable = new Subject();
  }
  setLogin(login:boolean): void {
    this.isLogin = login;
    this.observable.next(this.isLogin);
  }
}
