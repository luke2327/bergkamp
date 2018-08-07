import { Component, OnInit, OnDestroy, AfterViewInit, ChangeDetectorRef } from '@angular/core';
import { SnapshotService } from '../../aws-appsync/service/snapshot.service';
import { SnapshotDataService } from '../../aws-appsync/service/snapshot-data.service';
import { SnapshotDataFragment } from '../../aws-appsync/types/EventAPI';
import { significantFig } from '../../app.util';
import { CommonSubComponent } from '../../common-sub/common-sub.component';
import { CompStateService } from '../../service/comp-state.service';
@Component({
  selector: 'app-tymx-quote',
  templateUrl: './tymx-quote.component.html',
  styleUrls: ['./tymx-quote.component.sass']
})
export class TymxQuoteComponent extends CommonSubComponent implements OnInit, AfterViewInit, OnDestroy {

  color: string;
  quotesValues: Array<SnapshotDataFragment> = [];
  //가격변동시 색깔표현을 위해 버퍼용 객체를 만든다.
  quotesBeforePrices: any;
  significantFig = significantFig;
  snapShotSubScription: any;
  constructor(
    public snapshotDataService: SnapshotDataService,
    public changeDetectorRef:ChangeDetectorRef,
    public compStateService: CompStateService
  ) {
    super(compStateService);
    //quotesValues 객체를 그대로 가져가기보단 필요한 값을 map으로 관리
    this.quotesBeforePrices = new Map<string, number>();
  }
  ngOnInit() {}
  ngAfterViewInit(){
    //문제가 추가로 확인되어
    //이 부분을 추가함
    //https://stackoverflow.com/questions/34364880/expression-has-changed-after-it-was-checked
    this.changeDetectorRef.detectChanges();
  }

  //subscribe 내부에서 view 변경을 하는경우
  //subscribe를 취소해주고 참조를 제거해줘야함
  ngOnDestroy() {
    this.snapShotSubScription.unsubscribe();
    this.changeDetectorRef.detach();
  }
  startComponent() {

    this.snapShotSubScription = this.snapshotDataService.queryObservable.subscribe((value) => {
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
  startComponentErr() {

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
}
