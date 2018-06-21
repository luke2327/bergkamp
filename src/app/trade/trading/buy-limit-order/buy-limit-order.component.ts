import { Component, OnInit } from '@angular/core';
import { CommonOrderComponent } from '../common-order/common-order.component';
@Component({
  selector: 'app-buy-limit-order',
  templateUrl: '../common-order/common-order.component.html',
  styleUrls: ['../common-order/common-order.component.sass']
})
export class BuyLimitOrderComponent extends CommonOrderComponent implements OnInit {

  constructor() {
    super();
    this.isLimit = true;
    this.isBuy = true;
  }

  ngOnInit() {
  }

}
