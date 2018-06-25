import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-trade-history',
  templateUrl: './trade-history.component.html',
  styleUrls: ['./trade-history.component.sass']
})
/*
거래 히스토리 Component
1. TODO 히스토리 데이터를 받아와서
2. table에 뿌려준다.
3. TODO price color는 아마 type에 대해 바뀌게 될듯
*/
export class TradeHistoryComponent implements OnInit {
  //우선은 sample data를 대충 만들어 놓고 ui만 구현
  sampleData:any = {
    "history" : [
      {"time" : "20:05:10", "price" : 200, "amount" : 2000, "type" : "ask"},
      {"time" : "20:05:11", "price" : 2300, "amount" : 2000, "type" : "ask"},
      {"time" : "20:05:12", "price" : 2400, "amount" : 2000, "type" : "bid"},
      {"time" : "20:05:13", "price" : 2100, "amount" : 2000, "type" : "ask"},
      {"time" : "20:05:14", "price" : 2100, "amount" : 2000, "type" : "ask"},
      {"time" : "20:05:15", "price" : 2100, "amount" : 2000, "type" : "bid"},
      {"time" : "20:05:16", "price" : 2000, "amount" : 2000, "type" : "bid"},
      {"time" : "20:05:17", "price" : 2100, "amount" : 2000, "type" : "bid"},
      {"time" : "20:05:18", "price" : 1200, "amount" : 2000, "type" : "ask"},
      {"time" : "20:05:19", "price" : 200, "amount" : 2000, "type" : "bid"}
    ]
  }
  constructor() { }

  ngOnInit() {
  }

  getType(type: string):number {
    return (type=="ask")?1:-1;
  }
}
