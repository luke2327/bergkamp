import { Injectable } from '@angular/core';
import { Observable } from 'rxjs/Observable';
import { Subject } from 'rxjs/Subject';
/*
  page가 바뀌었는데 noti창이 계속 열리는 문제를 해결하기위해
  service를 이용해서 변경하고 통지해준다.
*/
@Injectable()
export class NotiToggleService {
  observable: any;
  isOpen: boolean;
  constructor() {
    this.observable = new Subject();
  }

  toggle(): void {
    this.isOpen = !this.isOpen;
    this.observable.next(this.isOpen);
  }

  setOpen(open: boolean): void {
    this.isOpen = open;
    this.observable.next(this.isOpen);
  }
}
