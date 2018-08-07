import { Component, OnInit } from '@angular/core';
import { CommonOrderComponent } from '../common-order/common-order.component';
import { OrderService } from '../../../rest-api/service/order.service';
import { OrderDataService } from '../../../rest-api/service/order-data.service';
import { TradePageStateService } from '../../../service/trade-page-state.service';
import { CompStateService } from '../../../service/comp-state.service';
@Component({
  selector: 'app-sell-limit-order',
  templateUrl: '../common-order/common-order.component.html',
  styleUrls: ['../common-order/common-order.component.sass']
})
export class SellLimitOrderComponent extends CommonOrderComponent implements OnInit {


  constructor(
    public orderService:OrderService,
    public orderDataService:OrderDataService,
    public tradePageStateService:TradePageStateService,
    public compStateService: CompStateService
  ) {
    super(orderService, orderDataService, tradePageStateService, compStateService);
    this.isLimit = true;
    this.isBuy = false;
  }

  ngOnInit() {
  }

}
