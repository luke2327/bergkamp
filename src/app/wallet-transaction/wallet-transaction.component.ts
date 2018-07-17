import { Component, OnInit } from '@angular/core';
import { WalletService } from '../rest-api/service/wallet.service';
import { ActivatedRoute } from '@angular/router';
@Component({
  selector: 'app-wallet-transaction',
  templateUrl: './wallet-transaction.component.html',
  styleUrls: ['./wallet-transaction.component.sass']
})
export class WalletTransactionComponent implements OnInit {
  subscribeId: any;
  type: any;
  selectedTab: number;
  constructor(private walletService: WalletService,
    private route: ActivatedRoute) { }

  ngOnInit() {
    this.selectedTab = 0;
    this.walletService.getBankStatementCrypto('all');
    this.subscribeId = this.route.params.subscribe(params => {
      if(params!=null && params['id']!=null) {
        this.type = params['id'];
        if(this.type=='withdrawal')
          this.selectedTab = 1;
      }

    });
  }

}
