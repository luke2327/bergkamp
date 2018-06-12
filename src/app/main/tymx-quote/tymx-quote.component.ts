import { Component, OnInit, AfterViewInit } from '@angular/core';
import { SnapshotService } from '../../aws-appsync/service/snapshot.service';
import { SnapshotDataFragment } from '../../aws-appsync/types/EventAPI';
@Component({
  selector: 'app-tymx-quote',
  templateUrl: './tymx-quote.component.html',
  styleUrls: ['./tymx-quote.component.css']
})
export class TymxQuoteComponent implements OnInit, AfterViewInit {

  color: string;
  quotesValues: Array<SnapshotDataFragment> = [];
  //가격변동시 색깔표현을 위해 버퍼용 객체를 만든다.
  quotesBeforePrices: any;

  constructor(private snapshotService: SnapshotService) {
    //quotesValues 객체를 그대로 가져가기보단 필요한 값을 map으로 관리
    this.quotesBeforePrices = new Map<string, number>();
  }


  ngOnInit() {}
  ngAfterViewInit(){
    //Lifecycle hook that is called after a component's view has been fully initialized.
    //ngOnInit에서 구동할경우 expressionchangedafterithasbeencheckederror(에러명 졸라김..;;)
    //문제가 발생한다.
    //참고 : https://angular.io/api/core/AfterViewInit
    this.snapshotService.queryObservable.subscribe((value) => {
      this.quotesValues = [];
      for(let entry of value){
        if(entry.type == 'BASE'){
          this.quotesValues.push(entry);
          if(this.quotesBeforePrices.get(entry.pair) === undefined){
            this.quotesBeforePrices.set(entry.pair, entry.price);
          }
        }
      }
    });
  }
  //이전가격과의 차이를 리턴해준다.
  priceDiff(pair, price): number {
    try {
      let diff = price - this.quotesBeforePrices.get(pair);
      this.quotesBeforePrices.set(pair, price);
      return diff;
    } catch (e) {
      return 0;
    }

  }
  //유효숫자 리턴
  //기획사항 : 10보자 작으면 소수점 8자리까지
  //아닐경우 10억보다 크면 소숫점X, 그외는 유효숫자만큼
  significantFig(price): number {
    let decimalPoint: number = 8;
    if(price < 10) {
      decimalPoint = 8;
    } else {
      decimalPoint = 9 - (Math.floor(Math.log10(price)) + 1);
      if(decimalPoint < 0){
        decimalPoint = 0;
      }
    }

    return price.toFixed(decimalPoint);
  }
}
