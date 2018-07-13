import { Component, OnInit } from '@angular/core';
import { CommonOrderComponent } from '../common-order/common-order.component';
import { OrderService } from '../../../rest-api/service/order.service';
import { OrderDataService } from '../../../rest-api/service/order-data.service';
import { TradePageStateService } from '../../../service/trade-page-state.service';
@Component({
  selector: 'app-buy-market-order',
  templateUrl: '../common-order/common-order.component.html',
  styleUrls: ['../common-order/common-order.component.sass']
})
export class BuyMarketOrderComponent extends CommonOrderComponent implements OnInit {

  constructor(orderService:OrderService,
    orderDataService:OrderDataService,
    tradePageStateService:TradePageStateService) {
    super(orderService, orderDataService, tradePageStateService);
    this.isLimit = false;
    this.isBuy = true;
  }

  ngOnInit() {
  }

}
