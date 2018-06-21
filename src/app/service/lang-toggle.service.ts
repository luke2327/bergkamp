import { Injectable } from '@angular/core';
import { Observable } from 'rxjs/Observable';
import { Subject } from 'rxjs/Subject';
/*
  language popover창을 조절하는 toggle service
  service를 이용해서 변경하고 통지해준다.
*/
@Injectable()
export class LangToggleService {

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
