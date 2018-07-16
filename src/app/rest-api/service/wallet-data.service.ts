import { Injectable } from '@angular/core';
import { Observable } from 'rxjs/Observable';
import { Subject } from 'rxjs/Subject';
@Injectable()
export class WalletDataService {

  //이름이 긴게 맘에 안들지만......
  getBalanceCryptoAllSub: any;
  getBalanceCryptoSub: any;
  getAddrMyCryptoSub: any;
  getAddrFavCryptoSub: any;
  postAddrFavCryptoSub: any;
  delAddrFavCryptoSub: any;
  postWithdrawalCryptoSub: any;
  getBankStatementCryptoAllSub: any;

  constructor() {
    this.getBalanceCryptoAllSub = new Subject();
    this.getBalanceCryptoSub = new Subject();
    this.getAddrMyCryptoSub = new Subject();
    this.getAddrFavCryptoSub = new Subject();
    this.postAddrFavCryptoSub = new Subject();
    this.delAddrFavCryptoSub = new Subject();
    this.postWithdrawalCryptoSub = new Subject();
    this.getBankStatementCryptoAllSub = new Subject();
  }

  setGetBalanceCryptoAll(data: any): void {
    this.getBalanceCryptoAllSub.next(data);
  }
  setGetBalanceCrypto(data: any): void {
    this.getBalanceCryptoSub.next(data);
  }
  setGetAddrMyCrypto(data: any): void {
    this.getAddrMyCryptoSub.next(data);
  }
  setGetAddrFavCrypto(data: any): void {
    this.getAddrFavCryptoSub.next(data);
  }
  setPostAddrFavCrypto(data: any): void {
    this.postAddrFavCryptoSub.next(data);
  }
  setDelAddrFavCrypto(data: any): void {
    this.delAddrFavCryptoSub.next(data);
  }
  setPostWithdrawalCrypto(data: any): void {
    this.postWithdrawalCryptoSub.next(data);
  }
  setGetBankStatementCryptoAllSub(data: any): void {
    this.getBankStatementCryptoAllSub.next(data);
  }
}
