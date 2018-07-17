import { Injectable } from '@angular/core';
import { Http, Response, Headers } from '@angular/http';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs/Observable';
import {
  RestUrlBase,
  RestUrlWBCryptoAll,
  RestUrlWBCrypto,
  RestUrlWAMCrypto,
  RestUrlWAFCrypto,
  RestUrlWWCrypto,
  RestUrlWBCCrypto,
  RequestOptions
} from '../../app.const';
import { WalletDataService } from '../service/wallet-data.service';
/*
wallet관련 rest-api 처리
*/
@Injectable()
export class WalletService {

  httpOptions: RequestOptions;

  constructor(private http: HttpClient, private walletDataService: WalletDataService) { }

  getBalanceCryptoAll(): void {
    this.httpOptions = {
      headers: new HttpHeaders({
        'Content-Type': 'application/json'
      })
      ,observe : 'response'
    };

    this.http.get(RestUrlBase+RestUrlWBCryptoAll, this.httpOptions)
      .subscribe(data => {
      this.walletDataService.setGetBalanceCryptoAll(data);
    });
  }

  getBalanceCrypto(crypto: any): void {
    this.httpOptions = {
      headers: new HttpHeaders({
        'Content-Type': 'application/json'
      })
      ,observe : 'response'
    };
    this.http.get(RestUrlBase+RestUrlWBCrypto+crypto, this.httpOptions)
      .subscribe(data => {
      this.walletDataService.setGetBalanceCrypto(data);
    });
  }

  getAddrMyCrypto(crypto: any): void {
    this.httpOptions = {
      headers: new HttpHeaders({
        'Content-Type': 'application/json'
      })
      ,observe : 'response'
    };
    this.http.get(RestUrlBase+RestUrlWAMCrypto+crypto, this.httpOptions)
      .subscribe(data => {
      this.walletDataService.setGetAddrMyCrypto(data);
    });
  }

  getAddrFavCrypto(crypto: any): void {
    this.httpOptions = {
      headers: new HttpHeaders({
        'Content-Type': 'application/json'
      })
      ,observe : 'response'
    };
    this.http.get(RestUrlBase+RestUrlWAFCrypto+crypto, this.httpOptions)
      .subscribe(data => {
      this.walletDataService.setGetAddrFavCrypto(data);
    });
  }

  postAddrFavCrypto(jsonBody: any, crypto: any): void {
    this.httpOptions = {
      headers: new HttpHeaders({
        'Content-Type': 'application/json'
      })
      ,observe : 'response'
    };
    this.http.post(RestUrlBase+RestUrlWAFCrypto+crypto, jsonBody, this.httpOptions)
      .subscribe(data => {
      this.walletDataService.setPostAddrFavCrypto(data);
    });
  }

  delAddrFavCrypto(crypto: any, name: any): void {
    this.httpOptions = {
      headers: new HttpHeaders({
        'Content-Type': 'application/json',
        'name': name
      })
      ,observe : 'response'
    };
    this.http.delete(RestUrlBase+RestUrlWAFCrypto+crypto, this.httpOptions)
      .subscribe(data => {
      this.walletDataService.setDelAddrFavCrypto(data);
    });
  }

  postWithdrawalCrypto(jsonBody: any, crypto: any): void {
    this.httpOptions = {
      headers: new HttpHeaders({
        'Content-Type': 'application/json'
      })
      ,observe : 'response'
    };
    this.http.post(RestUrlBase+RestUrlWWCrypto+crypto, jsonBody, this.httpOptions)
      .subscribe(data => {
      this.walletDataService.setPostWithdrawalCrypto(data);
    });
  }

  getBankStatementCrypto(crypto: any): void {
    this.httpOptions = {
      headers: new HttpHeaders({
        'Content-Type': 'application/json'
      })
      ,observe : 'response'
    };
    this.http.get(RestUrlBase+RestUrlWBCCrypto+crypto, this.httpOptions)
      .subscribe(data => {
      this.walletDataService.setGetBankStatementCryptoAllSub(data);
    });
  }
}
