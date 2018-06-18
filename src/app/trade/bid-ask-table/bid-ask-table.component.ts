import { Component, Input, OnInit, group, trigger, state, animate, transition, style } from "@angular/core";
import { BidAskTableType, BidAskType } from "../../app.const";
@Component({
  selector: "app-bid-ask-table",
  templateUrl: "./bid-ask-table.component.html",
  styleUrls: ["./bid-ask-table.component.css"]
})
/*
호가창 구현
1. TODO 데이터를 받아와서
2. 일단 매수호가 매도호가를 보여준다.
3. 버튼을 통해 매도호가만 보여줄지 매수호가만 보여줄지
4. animation은 directice를 통해 구현
*/
export class BidAskTableComponent implements OnInit {
  //우선은 sample data를 대충 만들어 놓고 ui만 구현
  sampleData:any = {
    "ask" : [
      {"price" : 1.29, "amount" : 200, "total" : 2000},
      {"price" : 1.28, "amount" : 2300, "total" : 2000},
      {"price" : 1.27, "amount" : 2400, "total" : 2000},
      {"price" : 1.26, "amount" : 2100, "total" : 2000},
      {"price" : 1.25, "amount" : 2100, "total" : 2000},
      {"price" : 1.24, "amount" : 2100, "total" : 2000},
      {"price" : 1.23, "amount" : 2000, "total" : 2000},
      {"price" : 1.22, "amount" : 2100, "total" : 2000},
      {"price" : 1.21, "amount" : 1200, "total" : 2000},
      {"price" : 1.2, "amount" : 200, "total" : 2000}
    ],
    "bid" : [
      {"price" : 1.19, "amount" : 1200, "total" : 2000},
      {"price" : 1.18, "amount" : 2200, "total" : 2000},
      {"price" : 1.17, "amount" : 3200, "total" : 2000},
      {"price" : 1.16, "amount" : 4200, "total" : 2000},
      {"price" : 1.15, "amount" : 5200, "total" : 2000},
      {"price" : 1.14, "amount" : 6200, "total" : 2000},
      {"price" : 1.13, "amount" : 7200, "total" : 2000},
      {"price" : 1.12, "amount" : 8200, "total" : 2000},
      {"price" : 1.11, "amount" : 9200, "total" : 2000},
      {"price" : 1.1, "amount" : 10200, "total" : 2000}
    ]
  }
  tableType:number;
  btnAskType:number = BidAskType.Ask;
  btnBidType:number = BidAskType.Bid;

  constructor() {
    this.tableType = BidAskTableType.BidAndAsk;
  }

  ngOnInit() {
  }
  handleClick(){

  }
  //table type 변경
  changeTableType(type: number): void {
    switch(this.tableType) {
      case BidAskTableType.BidOnly :
        this.tableType = BidAskTableType.BidAndAsk;
        break;
      case BidAskTableType.AskOnly :
        this.tableType = BidAskTableType.BidAndAsk;
        break;
      case BidAskTableType.BidAndAsk :
        if(type == BidAskType.Bid) {
          this.tableType = BidAskTableType.BidOnly;
        } else {
          this.tableType = BidAskTableType.AskOnly;
        }
        break;
    }
  }
  //매도호가
  getAskList(): any[] {
    let listLength: number = 0;
    switch(this.tableType) {
      case BidAskTableType.BidOnly :
        listLength = 0;
        break;
      case BidAskTableType.AskOnly :
        listLength = 10;
        break;
      case BidAskTableType.BidAndAsk :
        listLength = 5;
        break;
    }
    return this.sampleData.ask.slice(this.sampleData.ask.length - listLength);
  }
  //매수호가
  getBidList(): any[] {
    let listLength: number = 0;
    switch(this.tableType) {
      case BidAskTableType.BidOnly :
        listLength = 10;
        break;
      case BidAskTableType.AskOnly :
        listLength = 0;
        break;
      case BidAskTableType.BidAndAsk :
        listLength = 5;
        break;
    }
    return this.sampleData.bid.slice(0, listLength);
  }
}
