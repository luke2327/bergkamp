import { Component, OnInit, AfterViewInit, OnDestroy } from '@angular/core';
import { TranslateService } from '@ngx-translate/core';
import { Router } from "@angular/router";
import { Auth2FaModel } from '../../app.model';
import { TymxRouterService } from '../../service/tymx-router.service';
import { UserLoginService } from "../../aws-appsync/service/user-login.service";
@Component({
  selector: 'app-auth-2fa',
  templateUrl: './auth-2fa.component.html',
  styleUrls: ['./auth-2fa.component.sass']
})
export class Auth2faComponent implements OnInit, AfterViewInit, OnDestroy {
  isGoogleAuth: boolean;
  isSmsAuth: boolean;

  viewModel: Auth2FaModel;

  constructor(private translateService: TranslateService,
              private router: Router,
              private tymxRouterService: TymxRouterService,
              private userService: UserLoginService) {
    this.isGoogleAuth = true;
    this.isSmsAuth = true;

  }

  ngOnInit() {
    this.viewModel = new Auth2FaModel();
    this.viewModel.enableGoogle = true;
    this.viewModel.enableSms = true;
  }

  ngAfterViewInit() {

  }
  ngOnDestroy() {

  }

  authGoogle() {
    if(this.viewModel.gAuthCode.length == 0) {
      this.translateService.get("S0020").subscribe((result: string) => {
        this.viewModel.gAuthErrMsg = result;
        this.viewModel.gAuthErr = true;
      });

      return;
    }

    //TODO 인증코드 맞는지 체크는 우선 패스한다.
    this.userService.loginSub(true);
    console.log("hi:::"+this.tymxRouterService.getPreviousUrl());
    this.router.navigate([this.tymxRouterService.getPreviousUrl()]);
  }

  authSms() {
    this.viewModel.smsSendCount = 0;
    if(this.viewModel.smsAuthCode.length  == 0) {
      this.translateService.get("S0020").subscribe((result: string) => {
        this.viewModel.smsAuthErrMsg = result;
        this.viewModel.smsAuthErr = true;
      });

      return;
    }

    //TODO 인증코드 맞는지 체크는 우선 패스한다.
    this.userService.loginSub(true);
    this.router.navigate([this.tymxRouterService.getPreviousUrl()]);
  }

  sendSmsAuth() {
    this.viewModel.smsSendCount = 60;
    this.startTimer();
  }

  inputGoogleAuth(data: any) {
    if(data.length > 0) {
      this.viewModel.gAuthErr = false;
    }
  }

  inputSmsAuth(data: any) {
    if(data.length > 0) {
      this.viewModel.smsAuthErr = false;
    }
  }

  startTimer() {
    if(this.viewModel.smsSendCount>0) {
      setTimeout(() => {
        console.log(this.viewModel.smsSendCount);
        this.viewModel.smsSendCount -= 1;
        this.startTimer();
      },1000);
    }

  }
}
