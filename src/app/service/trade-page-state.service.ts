import { Injectable } from '@angular/core';
/*
  trade page는 여러개의 tab을 갖고있으므로
  어떤 tab이 열려있을때 어떤동작을 하는지 분기처리할 필요가 있다.
  일단 subscribe까지 필요할까라는 생각이 있어서
  getter setter로 구현해둔다.
*/
@Injectable()
export class TradePageStateService {
  //구매 tab 상태
  buyTabState : any;
  //sell tab 상태
  sellTabState: any;
  //history tab 상태
  historyTabState: any;

  constructor() {

  }

  setBuyTabState(state: any): void {
    this.buyTabState = state;
  }

  getBuyTabState(): any {
    return this.buyTabState;
  }

  setSellTablState(state: any): void {
    this.sellTabState = state;
  }

  getSellTabState(): any {
    return this.sellTabState;
  }

  setHistoryTabState(state: any): void {
    this.historyTabState = state;
  }

  getHistoryTabState(): any {
    return this.historyTabState;
  }
}
