import { Component, OnInit, AfterViewInit } from '@angular/core';
import { WalletDataService } from '../../rest-api/service/wallet-data.service';
import { WalletHistoryRowModel } from '../../../app/app.model';
import { MomentModule } from 'angular2-moment';
import { MomentTimezoneModule } from 'angular-moment-timezone';
@Component({
  selector: 'app-common-history',
  templateUrl: './common-history.component.html',
  styleUrls: ['./common-history.component.sass']
})
export class CommonHistoryComponent implements OnInit, AfterViewInit {
  viewModel: Array<WalletHistoryRowModel>;
  seeAll: boolean; //입금 출금에만 있는 버튼처리를 위해
  routerId: string; //입금인지 출금인지
  cryptos: any;
  cryptoMap: any;
  geoloc: any;
  constructor(protected walletDataService: WalletDataService) {
    this.cryptoMap = new Map();
    this.viewModel = [];
    this.seeAll = false;
  }

  ngOnInit() {
  }

  ngAfterViewInit() {
    this.walletDataService.getBankStatementCryptoAllSub.subscribe(data => {
      this.geoloc = JSON.parse(localStorage.getItem("geoloc"));
      this.cryptos = JSON.parse(localStorage.getItem("info")).cryptos;
      for(let entry of this.cryptos) {
        this.cryptoMap.set(entry.id, entry);
      }
      this.viewModel = [];
      if(data.body.bank_statement != null)
        this.setHistory(data.body.bank_statement);
      else
        this.setHistory(data.body.result);
    });
  }
  //click해서 data reload함
  reloadHistory() {
    console.log('reload');
  }
  toggleOpen(data: WalletHistoryRowModel) {
    data.txVisible = !data.txVisible;
  }
  /*이부분만 상속받은데서 커스터마이징 해주자*/
  setHistory(data: any) {

  }
  //setHistory에서 필터링된 모델을 여기서 viewModel로 변환해서 list에 추가해준다.
  addModel(data: any) {

    let model: WalletHistoryRowModel = new WalletHistoryRowModel();
    model.id = data.id;
    model.abbre = this.cryptoMap.get(data.crypto).abbre;
    model.type = data.type;
    model.crypto = data.crypto;
    model.amount = data.amount;
    model.fee = data.fee;
    model.counter_addr = data.counter_addr;
    model.status = data.status;
    model.tx = data.tx;
    model.tx_ts = data.tx_ts;
    model.ct = new Date(data.ct*1000);
    model.txVisible = false;
    this.viewModel.push(model);
  }
}
