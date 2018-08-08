import { Component, OnInit, AfterViewInit, OnDestroy } from '@angular/core';
import { SnapshotDataService } from '../../aws-appsync/service/snapshot-data.service';
import { WalletService } from '../../rest-api/service/wallet.service';
import { WalletDataService } from '../../rest-api/service/wallet-data.service';
import { CommonSubComponent } from '../../common-sub/common-sub.component';
import { CompStateService } from '../../service/comp-state.service';
@Component({
  selector: 'app-wallet-header',
  templateUrl: './wallet-header.component.html',
  styleUrls: ['./wallet-header.component.sass']
})
export class WalletHeaderComponent extends CommonSubComponent implements OnInit, AfterViewInit, OnDestroy {

  snapShotSubScription: any;
  walletSub: any;
  //계좌정보
  balance: any;
  //info의 crypto 정보
  cryptos: any;
  cryptoMap: any;
  //snapshot 정보
  snapshotPairs: any;

  totalPriceByBTC: number;
  totalPriceByUSDT: number;

  constructor(
    private snapshotDataService: SnapshotDataService,
    private walletService: WalletService,
    private walletDataService: WalletDataService,
    public compStateService: CompStateService
  ) {
    super(compStateService);
    this.totalPriceByBTC = 0;
    this.totalPriceByUSDT = 0;
    this.cryptoMap = new Map();
  }

  ngOnInit() {
    //info에서 가져옴
    this.cryptos = JSON.parse(localStorage.getItem("info")).cryptos;
    for(let entry of this.cryptos) {
      this.cryptoMap.set(entry.id, entry);
    }
    console.log(this.cryptos);
    this.snapShotSubScription = this.snapshotDataService.queryObservable.subscribe((value) => {
      //snapshot 정보가 들어오면
      //계좌정보를 가져온다
      this.snapshotPairs = value;
      console.log(this.snapshotPairs);
      this.walletService.getBalanceCryptoAll(this.compStateService.token);
    });

    this.walletSub = this.walletDataService.getBalanceCryptoAllSub.subscribe(data => {
      this.balance = data.body.balance;
      for(let entry of this.balance) {
        let numerator = this.cryptoMap.get(entry.crypto).abbre;
        let total = this.cryptoMap.get(entry.crypto).amount + this.cryptoMap.get(entry.crypto).processing;

        this.totalPriceByBTC += this.getPairRatio(numerator, 'BTC');
        this.totalPriceByUSDT += this.getPairRatio(numerator, 'USDT');

      }
    });
  }
  startComponent() {

  }
  startComponentErr() {
  }
  ngAfterViewInit() {


  }
  ngOnDestroy() {
    this.snapShotSubScription.unsubscribe();
    this.walletSub.unsubscribe();
  }
  //가격정보를 BTC혹은 USDT 등으로 변환시켜주자
  getPairRatio(numer: any, denome: any): number {
    //두단계를 넘지않는다는 가정하에 코드를 짠다.
    let primaryFactor = [];
    let ratio = 0;
    for(let pair of this.snapshotPairs) {
      if(pair.pair.startsWith(numer)) {
        primaryFactor.push(pair);
        if(pair.pair.endsWith(denome)) {
          //한방에 찾으면 for문을 나오자.
          ratio = pair.price;
          break;
        }
      }
    }
    if(ratio != 0) {
      return ratio;
    } else {
      for(let factor of primaryFactor) {
        let key = factor.pair.split('/')[1] + '/' + denome;
        for(let pair of this.snapshotPairs) {
          if(pair.pair === key) {
            ratio = factor.price * pair.price;
            break;
          }
        }
      }

      return ratio;
    }
  }
}
