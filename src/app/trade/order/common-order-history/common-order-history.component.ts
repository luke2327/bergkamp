import { Component, OnInit } from '@angular/core';
import { OrderService } from '../../../rest-api/service/order.service';
import { OrderDataService } from '../../../rest-api/service/order-data.service';
@Component({
  selector: 'app-common-order-history',
  templateUrl: './common-order-history.component.html',
  styleUrls: ['./common-order-history.component.sass']
})
export class CommonOrderHistoryComponent implements OnInit {

  isOpenOrders: boolean = true;
  sampleData: any;
  orderData: any;
  constructor(protected orderService:OrderService,
    protected orderDataService:OrderDataService) { }

  ngOnInit() {
  }

  getType(type: string): number {
    return type==="ask" ? -1: 1;
  }
  cancelOrder(id: number): void {

  }
}
