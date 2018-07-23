import { Component, OnInit, AfterViewInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
@Component({
  selector: 'app-wallet-deposit',
  templateUrl: './wallet-deposit.component.html',
  styleUrls: ['./wallet-deposit.component.sass']
})
export class WalletDepositComponent implements OnInit, AfterViewInit {

  cryptoName: string;
  subscribeId: any;
  constructor(private route: ActivatedRoute) { }

  ngOnInit() {
    this.subscribeId = this.route.params.subscribe(params => {
      this.cryptoName = params['id'].toUpperCase();
    });
  }

  ngAfterViewInit() {

  }
}
