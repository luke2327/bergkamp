import { Component, OnInit } from '@angular/core';
import { CommonOrderComponent } from '../common-order/common-order.component';
@Component({
  selector: 'app-buy-market-order',
  templateUrl: '../common-order/common-order.component.html',
  styleUrls: ['../common-order/common-order.component.css']
})
export class BuyMarketOrderComponent extends CommonOrderComponent implements OnInit {

  constructor() {
    super();
    this.isLimit = false;
    this.isBuy = true;
  }

  ngOnInit() {
  }

}
