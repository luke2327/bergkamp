import { Component, OnInit } from '@angular/core';

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
export class CommonOrderComponent implements OnInit {

  isLogin: boolean = true;
  isLimit: boolean = false;
  isBuy: boolean = false;

  constructor() { }

  ngOnInit() {
  }

}
