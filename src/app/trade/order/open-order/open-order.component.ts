import { Component, OnInit, AfterViewInit } from '@angular/core';
import { CommonOrderHistoryComponent } from '../common-order-history/common-order-history.component';
import { OrderService } from '../../../rest-api/service/order.service';
import { OrderDataService } from '../../../rest-api/service/order-data.service';
import { CompStateService } from '../../../service/comp-state.service';
@Component({
  selector: 'app-open-order',
  templateUrl: '../common-order-history/common-order-history.component.html',
  styleUrls: ['../common-order-history/common-order-history.component.sass']
})
export class OpenOrderComponent extends CommonOrderHistoryComponent implements OnInit, AfterViewInit {

  constructor(
    orderService:OrderService,
    orderDataService:OrderDataService,
    public compStateService: CompStateService
  ) {
    super(orderService, orderDataService, compStateService);
    this.isOpenOrders = true;
  }

  ngOnInit() {
  }

  ngAfterViewInit() {
    this.getOrderMy();
    //get 이후 처리
    this.orderDataService.getOrderMyObservable.subscribe((data) => {
      console.log(data.body.result);
      this.orderData = data.body.result;
    });
    this.orderDataService.deleteOrderObservable.subscribe((data) => {
      console.log("this is deleted");
      this.getOrderMy();
    });
  }

  getOrderMy() {
    this.orderService.getOrderMy();
  }

  cancelOrder(id: number): void {
    this.orderService.deleteOrder(id);
  }
}
