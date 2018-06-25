import { Component, OnInit } from '@angular/core';
@Component({
  selector: 'app-header-noti',
  templateUrl: './header-noti.component.html',
  styleUrls: ['./header-noti.component.sass']
})
export class HeaderNotiComponent implements OnInit {

  sampleData: any = {
    "data" : [
      {
        "info" : "주문체결 - 10TMX 매도",
        "date" : "2018-05-25 12:11:11"
      },
      {
        "info" : "주문체결 - 10TMX 매도",
        "date" : "2018-05-25 12:11:11"
      },
      {
        "info" : "주문체결 - 10TMX 매도",
        "date" : "2018-05-25 12:11:11"
      },
      {
        "info" : "주문체결 - 10TMX 매도",
        "date" : "2018-05-25 12:11:11"
      }
    ]
  }
  constructor() { }

  ngOnInit() {
  }

}
