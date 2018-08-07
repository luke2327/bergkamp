import { Component, OnInit } from '@angular/core';
import { CommonHistoryComponent } from '../common-history/common-history.component';
import { WalletDataService } from '../../rest-api/service/wallet-data.service';
import { WalletService } from '../../rest-api/service/wallet.service';
import { CompStateService } from '../../service/comp-state.service';
@Component({
  selector: 'app-withdraw-history',
  templateUrl: '../common-history/common-history.component.html',
  styleUrls: ['../common-history/common-history.component.sass']
})
export class WithdrawHistoryComponent extends CommonHistoryComponent implements OnInit {

  constructor(protected walletDataService: WalletDataService,
    private walletService: WalletService,
    public compStateService: CompStateService) {
    super(walletDataService, compStateService);
  }

  ngOnInit() {
  }
  reloadHistory() {
    this.walletService.getBankStatementCrypto('all');
  }
  setHistory(data: any) {
    for(let entry of data) {
      if(entry.type == 'withdrawal')
        this.addModel(entry);
    }
  }
}
