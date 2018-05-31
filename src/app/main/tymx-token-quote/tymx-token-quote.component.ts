import { Component, OnInit, AfterViewInit } from '@angular/core';
import { SnapshotService } from '../../aws-appsync/service/snapshot.service';
import { SnapshotDataFragment } from '../../aws-appsync/types/EventAPI';
@Component({
  selector: 'app-tymx-token-quote',
  templateUrl: './tymx-token-quote.component.html',
  styleUrls: ['./tymx-token-quote.component.css']
})
export class TymxTokenQuoteComponent implements OnInit, AfterViewInit {

  quotesValues: Array<SnapshotDataFragment> = [];

  constructor(private snapshotService: SnapshotService) {
  }

  ngOnInit() {
  }

  ngAfterViewInit(){

    this.snapshotService.queryObservable.subscribe((value) => {
      this.quotesValues = [];
      for(let entry of value){
        if(entry.type != 'BASE'){
          this.quotesValues.push(entry);
        }
      }
      console.log(this.quotesValues);
    });
  }
  //유효숫자 리턴
  //기획사항 : 10보자 작으면 소수점 8자리까지
  //아닐경우 10억보다 크면 소숫점X, 그외는 유효숫자만큼
  //TODO 동일한 함수가 tymx-quote.component.ts에 있음
  //추후 기획에 따라 합쳐놓을지 나눌지 결정하자.
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
