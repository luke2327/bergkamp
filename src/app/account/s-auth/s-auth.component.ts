import { Component, OnInit } from '@angular/core';
import { TranslateService } from '@ngx-translate/core';
import { Router } from "@angular/router";
import { TymxRouterService } from "../../service/tymx-router.service";
import { Callback } from "../../aws-appsync/service/cognito.service";
import { UserParametersService } from "../../aws-appsync/service/user-parameters.service";
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
  confirmCallback: ConfirmCallback;
  constructor(public translateService: TranslateService,
              public router: Router,
              public tymxRouterService: TymxRouterService,
              public userParametersService: UserParametersService) {
    this.confirmCallback = new ConfirmCallback(this);
  }

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
    let attribute = {
      Name : 'phone_number',
      Value : this.viewModel.code + this.viewModel.cellNum
    };
    this.userParametersService.updateAttr(attribute, new SmsCallback(this));

    this.viewModel.smsSendCount = 60;
    this.startTimer();

  }
  sendConfirmCode() {
    this.userParametersService.getAttrVerificationCode("phone_number", this.confirmCallback);
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
    this.confirmCallback.confirm(this.viewModel.authCode);
    // this.router.navigate([this.tymxRouterService.getPreviousUrl()]);
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
export class SmsCallback implements Callback {
  component: SAuthComponent;
  constructor(component: SAuthComponent) {
    this.component = component;
  }

  callback(): void {

  }

  callbackWithParam(result: any): void {
    console.log("HERE!!!");
    console.log(result);
    if(result == 'SUCCESS') {
      this.component.sendConfirmCode();
    }
  }
}
export class ConfirmCallback implements Callback {
  component: SAuthComponent;
  attr: any;
  cognitoUser: any;
  verifyCallback: any;

  constructor(component: SAuthComponent) {
    this.component = component;
  }

  callback(): void {

  }

  callbackWithParam(result: any): void {
  }


  callbackWithConfirm(attr: any, cognitoUser: any, verifyCallback: any) {
    this.attr = attr;
    this.cognitoUser = cognitoUser;
    this.verifyCallback = verifyCallback;
  }

  confirm(confirmCode: any) {
    this.cognitoUser.verifyAttribute(this.attr, confirmCode, this.verifyCallback);

  }
}
