import { Component, OnInit, AfterViewInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { WalletDataService } from '../../rest-api/service/wallet-data.service';
import { WalletService } from '../../rest-api/service/wallet.service';
@Component({
  selector: 'app-deposit-address',
  templateUrl: './deposit-address.component.html',
  styleUrls: ['./deposit-address.component.sass']
})
/*deposit 주소영역 qrcode 변환은 라이브러리로 한다.*/
export class DepositAddressComponent implements OnInit, AfterViewInit {

  cryptoName: string;
  cryptoInfo: any;
  subscribeId: any;
  cryptoAddress: any;
  copied: boolean;
  constructor(private route: ActivatedRoute,
    private walletService: WalletService,
    private walletDataService: WalletDataService) { }
  ngOnInit() {
    this.cryptoAddress = null;
    this.copied = false;
    this.subscribeId = this.route.params.subscribe(params => {
      this.cryptoName = params['id'].toUpperCase();
      let cryptos = JSON.parse(localStorage.getItem("info")).cryptos;
      for(let entry of cryptos) {
        if(this.cryptoName == entry.abbre) {
          this.cryptoInfo = entry;
          break;
        }
      }
      this.walletService.getAddrMyCrypto(this.cryptoInfo.id);
    });
  }

  ngAfterViewInit() {
    this.walletDataService.getAddrMyCryptoSub.subscribe(data => {

      console.log(data.body.address.length);
      if(data.body.address.length>0) {
        console.log('good!!!!');
        console.log(data.body.address[0].address);
        this.cryptoAddress = data.body.address[0].address;
      }
    });
  }

  copyAddress() {
    this.copied = true;
    setTimeout(() => {this.copied=false}, 500);
  }
}
