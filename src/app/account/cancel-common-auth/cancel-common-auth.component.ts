import { Component, OnInit } from '@angular/core';
import { TranslateService } from '@ngx-translate/core';
import { Router } from "@angular/router";
import { TymxRouterService } from "../../service/tymx-router.service";
@Component({
  selector: 'app-cancel-common-auth',
  templateUrl: './cancel-common-auth.component.html',
  styleUrls: ['./cancel-common-auth.component.sass']
})
export class CancelCommonAuthComponent implements OnInit {

  public viewModel: ViewModel;

  constructor(public translateService: TranslateService,
              public router: Router,
              public tymxRouterService: TymxRouterService) {
    this.viewModel = new ViewModel();
  }

  ngOnInit() {

  }

  inCurrPw(data: any) {
    if(this.viewModel.pw.length > 0) {
      this.viewModel.isPwErr = false;
    }
  }

  inCurrGAuth(data: any) {
    if(this.viewModel.gAuthCode.length > 0) {
      this.viewModel.isGAuthCodeErr = false;
    }
  }

  inCurrSAuth(data: any) {
    if(this.viewModel.sAuthCode.length > 0) {
      this.viewModel.isSAuthCodeErr = false;
    }
  }

  send() {
    this.viewModel.smsSendCount = 60;
    this.startTimer();
  }

  setIsGAuth(data: boolean) {
    this.viewModel.isGoogleAuth = data;
    this.viewModel.isPwErr = false;
    this.viewModel.isGAuthCodeErr = false;
    this.viewModel.isSAuthCodeErr = false;
    this.viewModel.smsSendCount = 0;
  }

  googleAuth() {
    //TODO 일단은 대충 그림그릴거만 구현하고 추후 자식 component에서 구현하자..
    console.log("gauth");
    if(this.viewModel.pw.length == 0) {
      this.viewModel.isPwErr = true;
      this.translateService.get("S0018").subscribe((result: string) => {
        this.viewModel.pwErrMsg = result;
      });
      return;
    }

    if(this.viewModel.gAuthCode.length == 0) {
      this.viewModel.isGAuthCodeErr = true;
      this.translateService.get("S0019").subscribe((result: string) => {
        this.viewModel.gAuthCodeErrMsg = result;
      });
      return;
    }
  }

  sAuth() {
    //TODO 일단은 대충 그림그릴거만 구현하고 추후 자식 component에서 구현하자..
    if(this.viewModel.pw.length == 0) {
      this.viewModel.isPwErr = true;
      this.translateService.get("S0018").subscribe((result: string) => {
        this.viewModel.pwErrMsg = result;
      });
      return;
    }

    if(this.viewModel.sAuthCode.length == 0) {
      this.viewModel.isSAuthCodeErr = true;
      this.translateService.get("S0019").subscribe((result: string) => {
        this.viewModel.sAuthCodeErrMsg = result;
      });
      return;
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
  cancelType: number; //0: g-auth, 1: s-auth
  isGoogleAuth: boolean;
  pw: string;
  gAuthCode: string;
  sAuthCode: string;
  isPwErr: boolean;
  isGAuthCodeErr: boolean;
  isSAuthCodeErr: boolean;
  pwErrMsg: string;
  gAuthCodeErrMsg: string;
  sAuthCodeErrMsg: string;
  smsSendCount: number;
  cellNum: string;
  constructor() {
    this.cancelType = 0;
    this.isGoogleAuth = true;
    this.pw = "";
    this.gAuthCode = "";
    this.sAuthCode = "";
    this.isPwErr = false;
    this.isGAuthCodeErr = false;
    this.isSAuthCodeErr = false;
    this.pwErrMsg = "";
    this.gAuthCodeErrMsg = "";
    this.sAuthCodeErrMsg = "";
    this.smsSendCount = 0;
    this.cellNum = "010*******90";
  }
}
