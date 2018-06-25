import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-trading',
  templateUrl: './trading.component.html',
  styleUrls: ['./trading.component.sass']
})
/*
 주문 화면
 1. buy sell 구현
 2. 한번에 여기다 구현하면 코드가 길어질꺼 같아 쪼개서 두개의 하위 component를 둠
 3. 그냥 여긴 영역만 일단 잡아두는 부분이면 될듯?
*/
export class TradingComponent implements OnInit {

  constructor() { }

  ngOnInit() {
  }

}
