import { Component, OnInit } from '@angular/core';
import { OrderService } from '../../../rest-api/service/order.service';
import { OrderDataService } from '../../../rest-api/service/order-data.service';
import { CommonSubComponent } from '../../../common-sub/common-sub.component';
import { CompStateService } from '../../../service/comp-state.service';
@Component({
  selector: 'app-common-order-history',
  templateUrl: './common-order-history.component.html',
  styleUrls: ['./common-order-history.component.sass']
})
export class CommonOrderHistoryComponent extends CommonSubComponent implements OnInit {

  isOpenOrders: boolean = true;
  sampleData: any;
  orderData: any;
  constructor(
    protected orderService:OrderService,
    protected orderDataService:OrderDataService,
    public compStateService: CompStateService
  ) {
    super(compStateService);
  }
  startComponent() {
  }
  startComponentErr() {
  }
  ngOnInit() {
  }

  getType(type: string): number {
    return type==="ask" ? -1: 1;
  }
  cancelOrder(id: number): void {

  }
}
