import { Component, OnInit } from '@angular/core';
import { TranslateService } from '@ngx-translate/core';
import { Router } from "@angular/router";
import { TymxRouterService } from "../../service/tymx-router.service";
@Component({
  selector: 'app-s-auth',
  templateUrl: './s-auth.component.html',
  styleUrls: ['./s-auth.component.sass']
})
export class SAuthComponent implements OnInit {
  viewModel: ViewModel;
  codeMap: any;
  codeList: any = [
    { "country_code": "KR", "country" : "South Korea", "code" : "+82"},
    { "country_code": "JP",  "country" : "Japan", "code" : "+81"},
    { "country_code": "US",  "country" : "United States", "code" : "+1"},
    { "country_code": "UK",  "country" : "United Kingdom", "code" : "+44"}
  ];
  constructor(public translateService: TranslateService,
              public router: Router,
              public tymxRouterService: TymxRouterService) { }

  ngOnInit() {
    this.viewModel = new ViewModel();
    this.codeMap = new Map();
    for(let entry of this.codeList) {
      this.codeMap.set(entry.country_code, entry);
    }
  }

  selCountry (countryCode: any) {
    this.viewModel.countryCode = countryCode;
    this.viewModel.code = this.codeMap.get(countryCode).code;
  }

  send() {
    if(this.viewModel.cellNum.length == 0) {
      this.viewModel.isCellErr = true;
      this.translateService.get("S0057").subscribe((result: string) => {
        this.viewModel.cellErrMsg = result;
      });
      return;
    }
    this.viewModel.smsSendCount = 60;
    this.startTimer();
  }

  auth() {
    if(this.viewModel.cellNum.length == 0) {
      this.viewModel.isCellErr = true;
      this.translateService.get("S0057").subscribe((result: string) => {
        this.viewModel.cellErrMsg = result;
      });
      return;
    }
    if(this.viewModel.authCode.length == 0) {
      this.viewModel.isAuthErr = true;
      this.translateService.get("S0020").subscribe((result: string) => {
        this.viewModel.authErrMsg = result;
      });
      return;
    }
    this.router.navigate([this.tymxRouterService.getPreviousUrl()]);
  }

  inputCell(data: any) {
    if(this.viewModel.cellNum.length > 0) {
      this.viewModel.isCellErr = false;
    }
  }

  inputAuth(data: any) {
    if(this.viewModel.authCode.length > 0) {
      this.viewModel.isAuthErr = false;
    }
  }
  startTimer() {
    if(this.viewModel.smsSendCount>0) {
      setTimeout(() => {
        this.viewModel.smsSendCount -= 1;
        this.startTimer();
      },1000);
    }
  }
}

export class ViewModel {
  countryCode: string;
  code: string;
  cellNum: string;
  authCode: string;
  isCellErr: boolean;
  isAuthErr: boolean;
  cellErrMsg: string;
  authErrMsg: string;
  smsSendCount: number;

  constructor () {
    this.countryCode = "UK";
    this.code = "+44";
    this.cellNum = "";
    this.authCode = "";
    this.isCellErr = false;
    this.isAuthErr = false;
    this.cellErrMsg = "";
    this.authErrMsg = "";
    this.smsSendCount = 0;
  }
}
