import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-common-order-history',
  templateUrl: './common-order-history.component.html',
  styleUrls: ['./common-order-history.component.sass']
})
export class CommonOrderHistoryComponent implements OnInit {

  isOpenOrders: boolean = true;
  sampleData: any;
  constructor() { }

  ngOnInit() {
  }

  getType(type: string): number {
    return type==="Sell" ? -1: 1;
  }
}
