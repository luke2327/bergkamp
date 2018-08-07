import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { CommonHistoryComponent } from '../../wallet-transaction/common-history/common-history.component';
import { WalletDataService } from '../../rest-api/service/wallet-data.service';
import { WalletService } from '../../rest-api/service/wallet.service';
import { WalletHistoryRowModel } from '../../../app/app.model';
import { CompStateService } from '../../service/comp-state.service';
@Component({
  selector: 'app-deposit-history',
  templateUrl: '../../wallet-transaction/common-history/common-history.component.html',
  styleUrls: ['../../wallet-transaction/common-history/common-history.component.sass']
})
export class DepositHistoryComponent  extends CommonHistoryComponent implements OnInit {

  cryptoName: string;
  subscribeId: any;
  cryptoInfo: any;

  constructor(
    protected walletDataService: WalletDataService,
    private walletService: WalletService,
    private route: ActivatedRoute,
    public compStateService: CompStateService
  ) {
    super(walletDataService, compStateService);
    this.seeAll = true;
    this.routerId = 'deposit';
  }

  ngOnInit() {
    this.subscribeId = this.route.params.subscribe(params => {
      this.cryptoName = params['id'].toUpperCase();
      let cryptos = JSON.parse(localStorage.getItem("info")).cryptos;
      for(let entry of cryptos) {
        if(this.cryptoName == entry.abbre) {
          this.cryptoInfo = entry;
          break;
        }
      }
      this.walletService.getBankStatementCrypto(this.cryptoInfo.id);
    });
  }
  reloadHistory() {
    this.walletService.getBankStatementCrypto(this.cryptoInfo.id);
  }
  setHistory(data: any) {
    if(data!=null) {
      for(let entry of data) {
        if(entry.type == 'deposit')
          this.addModel(entry);
      }
    }
  }
}
