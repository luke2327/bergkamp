import { Component, OnInit } from '@angular/core';
import { CommonOrderHistoryComponent } from '../common-order-history/common-order-history.component';
@Component({
  selector: 'app-order-history',
  templateUrl: '../common-order-history/common-order-history.component.html',
  styleUrls: ['../common-order-history/common-order-history.component.sass']
})
export class OrderHistoryComponent extends CommonOrderHistoryComponent implements OnInit {

  constructor() {
    super();
    this.isOpenOrders = false;
    this.sampleData = {
      "data" : [
        {
          "date" : "05.19 20:54:15",
          "pair" : "TMX/ETH",
          "type" : "Limit",
          "order" : "Sell",
          "price" : "12345678 ETH",
          "amount" : "2.5000 TMX",
          "filled" : "0.0 TMX",
          "total" : "3,098123124 ETH",
          "status" : "Filled"
        },
        {
          "date" : "05.19 20:54:15",
          "pair" : "TMX/ETH",
          "type" : "Limit",
          "order" : "Buy",
          "price" : "12345678 ETH",
          "amount" : "2.5000 TMX",
          "filled" : "0.0 TMX",
          "total" : "3,098123124 ETH",
          "status" : "Filled"
        },
        {
          "date" : "05.19 20:54:15",
          "pair" : "TMX/ETH",
          "type" : "Limit",
          "order" : "Sell",
          "price" : "12345678 ETH",
          "amount" : "2.5000 TMX",
          "filled" : "0.0 TMX",
          "total" : "3,098123124 ETH",
          "status" : "Filled"
        },
        {
          "date" : "05.19 20:54:15",
          "pair" : "TMX/ETH",
          "type" : "Limit",
          "order" : "Buy",
          "price" : "12345678 ETH",
          "amount" : "2.5000 TMX",
          "filled" : "0.0 TMX",
          "total" : "3,098123124 ETH",
          "status" : "Filled"
        },
        {
          "date" : "05.19 20:54:15",
          "pair" : "TMX/ETH",
          "type" : "Limit",
          "order" : "Sell",
          "price" : "12345678 ETH",
          "amount" : "2.5000 TMX",
          "filled" : "0.0 TMX",
          "total" : "3,098123124 ETH",
          "status" : "Filled"
        }
      ]
    }
  }

  ngOnInit() {
  }

}
