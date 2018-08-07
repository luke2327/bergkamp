import { Component, OnInit, OnDestroy } from '@angular/core';
import { CompStateService } from '../service/comp-state.service';
import { AppState } from '../app.const';
@Component({
  selector: 'app-common-sub',
  templateUrl: './common-sub.component.html',
  styleUrls: ['./common-sub.component.sass']
})
export class CommonSubComponent implements OnInit, OnDestroy {
  subscription: any;
  constructor(public compStateService: CompStateService) {
    this.subscription = this.compStateService.observable.subscribe((data) => {
      switch(data) {
        case AppState.StartApp:
          this.startComponent();
          break;
        case AppState.StartAppErr:
          this.startComponentErr();
          break;
      }
    });
  }

  ngOnInit() {

  }

  ngOnDestroy() {
    this.subscription.unsubscribe();
  }

  startComponent() {

  }
  startComponentErr() {

  }
}
