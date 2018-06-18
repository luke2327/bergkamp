import { Component, OnInit, AfterViewInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { SnapshotDataService } from '../../aws-appsync/service/snapshot-data.service';
import { significantFigByDP } from '../../app.util';
@Component({
  selector: 'app-coin-info',
  templateUrl: './coin-info.component.html',
  styleUrls: ['./coin-info.component.css']
})
export class CoinInfoComponent implements OnInit, AfterViewInit {
  symbolId: string;
  //실시간 코인정보
  coinInfo: any;
  //coininfo object의 유효성
  isValidCoinInfo: boolean = false;
  significantFig = significantFigByDP;
  beforePrice: number = 0;
  diffPrice: number = 0;
  constructor(private snapshotDataService: SnapshotDataService, private route: ActivatedRoute) {
    //파라미터 값을 가져온다
    this.route.params.subscribe(params => {
      this.symbolId = params['id'].replace('-',"/").toUpperCase();
    });
  }

  ngOnInit() {
  }
  ngAfterViewInit(){
    //실시간 정보를 받아와서
    this.snapshotDataService.queryObservable.subscribe((value) => {
      //현재코인정보와 일치하는놈을 찾는다.
      for(let entry of value){
        if(this.symbolId == entry.pair){
          this.coinInfo = entry;
          this.priceDiff(entry.price);
          this.isValidCoinInfo = true;
        }
      }
    });
  }
  //가격차이를 리턴
  priceDiff(price: number): void {
    console.log(this.diffPrice);
    this.diffPrice = this.isValidCoinInfo? price-this.beforePrice : 0;
    this.beforePrice = price;
  }
}
