import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
@Component({
  selector: 'app-wallet-withdraw',
  templateUrl: './wallet-withdraw.component.html',
  styleUrls: ['./wallet-withdraw.component.sass']
})
export class WalletWithdrawComponent implements OnInit {

  cryptoName: string;
  subscribeId: any;
  constructor(private route: ActivatedRoute) { }

  ngOnInit() {
    this.subscribeId = this.route.params.subscribe(params => {
      this.cryptoName = params['id'].toUpperCase();
    });
  }

}
