import { Component, OnInit, AfterViewInit } from '@angular/core';
import { OrderService } from '../../../rest-api/service/order.service';
import { OrderDataService } from '../../../rest-api/service/order-data.service';
import { RestStatus, OrderStatus, OrderHistoryType } from '../../../app.const';
import { TradePageStateService } from '../../../service/trade-page-state.service';
@Component({
  selector: 'app-common-order',
  templateUrl: './common-order.component.html',
  styleUrls: ['./common-order.component.sass']
})
/*
주문 공통 화면
어짜피 html이 비슷비슷한데
살짝살짝 바뀌니
html을 하나에 작성해서
네가지로 나눈다
1. buy-limit
2. buy-market
3. sell-limit
4. sell-market

각각에 기능도 크게 다르지 않으므로 이 common order component를 상속받아서
필요한 부분만 자식 component에서 재구현해쓰자
*/
export class CommonOrderComponent implements OnInit, AfterViewInit {

  isLogin: boolean = true;
  isLimit: boolean = false;
  isBuy: boolean = false;

  sampleOrderData: any = {"pair": 1, "bidask": "bid", "order_type": "price", "volume": 1, "price": 0.2};
  orderData: any = {};
  postOrderSubscription: any;
  //페이지 상태정보
  pageStatus: number;
  //call 요청한 페이지 정보
  callPageStatus: number;

  //일단 balance 정보가 없으므로 대충
  balance: number = 10000;
  price: number = 0;
  amount: number = 0;
  //최소단위도 없으므로 일단 대충값만 잡아준다.
  callMinUnit: number = 5; //호가단위
  amountMinUnit: number = 10; //총량최소단위
  constructor(private orderService:OrderService,
    private orderDataService:OrderDataService,
    private tradePageStateService:TradePageStateService) {

    this.callPageStatus = OrderStatus.Undefined;
  }

  ngOnInit() {}
  ngAfterViewInit() {
    this.setOrderStatus();
    this.postOrderSubscription = this.orderDataService.postOrderObservable.subscribe((data) => {
      if(this.callPageStatus == this.pageStatus) {
        if(data.status == RestStatus.ResultOk) {
          if( this.tradePageStateService.getHistoryTabState() == OrderHistoryType.OpenOrder ) {
            //OpenOrder일때
            this.orderService.getOrderMy();
          } else {
            //OrderHistory일때
          }
        }
      }

    });
  }
  orderCoin(): void {
    //데이터를 세팅하고
    this.orderData.pair = 1;
    this.orderData.bidask = this.isBuy? "bid": "ask";
    this.orderData.order_type = this.isLimit? "limit": "market";
    this.orderData.volume = this.amount;
    this.orderData.price = this.price;
    //콜한다.
    this.orderService.postOrder(this.orderData);
    //어떤 페이지 콜인지 체크를 위해
    this.callPageStatus = this.pageStatus;
  }
  //현재 페이지가 어떤페이지냐
  //enum의 숫자값에다 맞춰준다.
  setOrderStatus(): void {
   this.pageStatus = (this.isBuy?0:1) * 2 + (this.isLimit?0:1);
  }

  setPrice(price: number): void {
    this.price = price;
  }

  changePrice(isAdd: boolean): void {
    isAdd ?
      this.price += this.callMinUnit :
      this.price = Math.max(this.price - this.callMinUnit, 0);
  }

  setAmount(amount: number): void {
    this.amount = amount;
  }

  changeAmount(isAdd: boolean): void {
    isAdd ?
      this.amount += this.amountMinUnit :
      this.amount = Math.max(this.amount - this.amountMinUnit, 0);
  }

  changeAmountByRatio(ratio: number): void {
    //TODO 매도시에는 이걸로 쓰면 안됨
    //추후수정예정
    if(this.price != 0) {
      this.amount = (this.balance/this.price) * ratio;
      this.amount -= this.amount % this.amountMinUnit;
    }
  }
}
