import { Component, OnInit, AfterViewInit, OnDestroy } from '@angular/core';
import { SnapshotDataService } from '../../aws-appsync/service/snapshot-data.service';
import { WalletService } from '../../rest-api/service/wallet.service';
import { WalletDataService } from '../../rest-api/service/wallet-data.service';
import { getLang } from '../../app.util';
import { SortingOrder, SortingOrderName, SortingWallet } from '../../app.const';
import { WalletCryptoRowModel } from '../../app.model';
@Component({
  selector: 'app-wallet-crypto',
  templateUrl: './wallet-crypto.component.html',
  styleUrls: ['./wallet-crypto.component.sass']
})

export class WalletCryptoComponent implements OnInit, AfterViewInit {

  snapShotSubScription: any;
  balance: any;
  cryptos: any;
  cryptoMap: any;
  //snapshot 정보
  snapshotPairs: any;

  //view 모델
  balanceBase: any;
  balanceNoneBase: any;
  cryptoBase: any;
  cryptoNoneBase: any;
  isBalance: boolean;

  //Sorting
  sorting: Array<SortingWallet>;

  constructor(private snapshotDataService: SnapshotDataService,
    private walletService: WalletService,
    private walletDataService: WalletDataService) { }

  ngOnInit() {
    this.cryptoMap = new Map();
    this.balanceBase = [];
    this.balanceNoneBase = [];
    this.cryptoBase = [];
    this.cryptoNoneBase = [];
    this.isBalance = false;
    this.initSorting();
  }
  ngAfterViewInit() {
    //info에서 가져옴
    this.cryptos = JSON.parse(localStorage.getItem("info")).cryptos;
    for(let entry of this.cryptos) {
      this.cryptoMap.set(entry.id, entry);
    }
    this.snapShotSubScription = this.snapshotDataService.queryObservable.subscribe((value) => {
      this.snapshotPairs = value;
    });
    this.walletDataService.getBalanceCryptoAllSub.subscribe(data => {
      this.balanceBase = [];
      this.balanceNoneBase = [];
      this.cryptoBase = [];
      this.cryptoNoneBase = [];

      this.balance = data.body.balance;
      //정보를 다 가져왔다
      //row에 들어갈 정보를 만들어주자
      for(let crypto of this.cryptos) {
        let rowModel:WalletCryptoRowModel = this.buildRowModel(crypto);
        for (let balance of this.balance) {
          //balance정보가 있는지 확인
          if(rowModel.id == balance.crypto) {
            this.buildRowModelBalance(rowModel, balance);
          }
        }
        if(crypto.type == 'BASE') {
          this.cryptoBase.push(rowModel);
          if(rowModel.total>0) {
            this.balanceBase.push(rowModel);
          }

        } else {
          this.cryptoNoneBase.push(rowModel);
          if(rowModel.total>0) {
            this.balanceNoneBase.push(rowModel);
          }
        }
      }
      this.initSorting();
      this.sortingTable(4);
    });
  }
  //sorting state 초기화
  initSorting() {
    this.sorting = [];
    for(let i = 0; i< 5; i++) {
      let entry = new SortingWallet();
      entry.id = i;
      entry.sortingType = SortingOrder;
      entry.sortingState = 0;
      this.sorting.push(entry);
    }
    this.sorting[0].sortingType = SortingOrderName;

  }
  sortingTable(position: number) {
    for(let entry of this.sorting) {
      if(entry.id == position) {
        entry.sortingState = (entry.sortingState + 1) % 3;
      } else {
        entry.sortingState = 0;
      }
    }

    if(this.sorting[position].sortingState == 0) {
      //아무것도 선택되지 않았을때는 BTC 가격으로 sorting
      this.sortingCrypto(4, 'desc');
    } else {
      let sortingState = this.sorting[position].sortingState;
      this.sortingCrypto(position, this.sorting[position].sortingType[sortingState]);
    }
  }

  sortingCrypto(position: number, sortType: string) {
    //네가지 array를 각각 sorting 해준다.
    this.balanceBase.sort((a, b) => {
      let isAsc = sortType == 'asc';
      switch (position) {
        case 0: return compare(a.name, b.name, isAsc);
        case 1: return compare(a.total, b.total, isAsc);
        case 2: return compare(a.available, b.available, isAsc);
        case 3: return compare(a.inOrder, b.inOrder, isAsc);
        case 4: return compare(a.byBtc, b.byBtc, isAsc);
        default: return 0;
      }
    });

    this.balanceNoneBase.sort((a, b) => {
      let isAsc = sortType == 'asc';
      switch (position) {
        case 0: return compare(a.name, b.name, isAsc);
        case 1: return compare(a.total, b.total, isAsc);
        case 2: return compare(a.available, b.available, isAsc);
        case 3: return compare(a.inOrder, b.inOrder, isAsc);
        case 4: return compare(a.byBtc, b.byBtc, isAsc);
        default: return 0;
      }
    });

    this.cryptoBase.sort((a, b) => {
      let isAsc = sortType == 'asc';
      switch (position) {
        case 0: return compare(a.name, b.name, isAsc);
        case 1: return compare(a.total, b.total, isAsc);
        case 2: return compare(a.available, b.available, isAsc);
        case 3: return compare(a.inOrder, b.inOrder, isAsc);
        case 4: return compare(a.byBtc, b.byBtc, isAsc);
        default: return 0;
      }
    });

    this.cryptoNoneBase.sort((a, b) => {
      let isAsc = sortType == 'asc';
      switch (position) {
        case 0: return compare(a.name, b.name, isAsc);
        case 1: return compare(a.total, b.total, isAsc);
        case 2: return compare(a.available, b.available, isAsc);
        case 3: return compare(a.inOrder, b.inOrder, isAsc);
        case 4: return compare(a.byBtc, b.byBtc, isAsc);
        default: return 0;
      }
    });
  }


  toggleIsBalance() {
    this.isBalance = !this.isBalance;
    this.toggleTradeDropdown(-1, false);
  }
  //클릭시 열려있던놈은 모두 닫고 열릴놈은 열리게(??뭔소리야)
  toggleTradeDropdown(id: number, visibility:boolean) {

    for(let entry of this.cryptoBase) {
      if(entry.id == id) {
        entry.tradeVisible = visibility;
      } else {
        entry.tradeVisible = false;
      }
    }

    for(let entry of this.balanceBase) {
      if(entry.id == id) {
        entry.tradeVisible = visibility;
      } else {
        entry.tradeVisible = false;
      }
    }

    for(let entry of this.cryptoNoneBase) {
      if(entry.id == id) {
        entry.tradeVisible = visibility;
      } else {
        entry.tradeVisible = false;
      }
    }

    for(let entry of this.balanceNoneBase) {
      if(entry.id == id) {
        entry.tradeVisible = visibility;
      } else {
        entry.tradeVisible = false;
      }
    }
  }
  //wallet-header와 동일한 함수
  //TODO 추후에 확정이 되면 한곳으로 모아둘 생각
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
  /*정렬류 처리를 위해 object를 build해준다.*/
  buildRowModel(crypto: any): WalletCryptoRowModel {
    let rowModel:WalletCryptoRowModel = new WalletCryptoRowModel();
    rowModel.id = crypto.id;
    rowModel.name = getLang() =='en'?
      JSON.parse(crypto.name).en : JSON.parse(crypto.name).ko;
    rowModel.abbre = crypto.abbre;
    rowModel.type = crypto.type;
    rowModel.total = 0;
    rowModel.available = 0;
    rowModel.inOrder = 0;
    rowModel.byBtc = 0;
    rowModel.byUsd = 0;
    rowModel.trade = [];
    rowModel.tradeVisible = false;
    for(let entry of this.snapshotPairs) {
      if(entry.pair.startsWith(rowModel.abbre))
        rowModel.trade.push(entry.pair);
    }
    return rowModel;
  }
  /*row model에 balance정보를 추가해준다*/
  buildRowModelBalance(rowModel: WalletCryptoRowModel, balance: any): WalletCryptoRowModel {
    let ratioUsd: number = this.getPairRatio(rowModel.abbre, 'USDT');
    let ratioBtc: number = this.getPairRatio(rowModel.abbre, 'BTC');

    rowModel.total = balance.amount + balance.processing;
    rowModel.available = balance.amount;
    rowModel.inOrder = balance.processing;
    rowModel.byBtc = balance.amount * ratioBtc;
    rowModel.byUsd = balance.amount * ratioUsd;

    return rowModel;
  }

}
function compare(a, b, isAsc) {
  return (a < b ? -1 : 1) * (isAsc ? 1 : -1);
}
