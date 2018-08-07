import { Component, OnInit, AfterViewInit, OnDestroy } from '@angular/core';
import { TranslateService } from '@ngx-translate/core';
import { Router } from "@angular/router";
import { EmailRegEx } from '../../app.const';
import { UserLoginService } from "../../aws-appsync/service/user-login.service";
import { CognitoCallback, LoggedInCallback } from "../../aws-appsync/service/cognito.service";
import { TymxRouterService } from '../../service/tymx-router.service';
@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.sass']
})
//수정 2018/8/2
//쫌 복잡해지긴 하지만
//2FA 모듈을 여기 갖다놔야할듯함
export class LoginComponent implements OnInit, AfterViewInit, OnDestroy, LoggedInCallback {

  viewModel: ViewModel;
  signInCallback: SignInCallback;
  confirmCodeCallBack: any;
  constructor(private translateService: TranslateService,
              public router: Router,
              public userService: UserLoginService,
              public tymxRouterService: TymxRouterService) {
    this.signInCallback = new SignInCallback(this);
  }

  ngOnInit() {
    this.viewModel = new ViewModel();
    this.viewModel.emailErrMsg = " ";
    this.viewModel.pwErrMsg = " ";
  }

  ngAfterViewInit() {
    // this.viewModel.emailErrMsg = this.translateService.instant("W0122");
    // this.viewModel.pwErrMsg = this.translateService.instant("W0122");

    //setTimeout을 쓰면 ExpressionChangedAfterItHasBeenCheckedError 를 확실하게 피할수 있다.
    //see : https://blog.angularindepth.com/everything-you-need-to-know-about-the-expressionchangedafterithasbeencheckederror-error-e3fd9ce7dbb4
    setTimeout(() => {
      this.translateService.get("W0121").subscribe((result: string) => {
        this.viewModel.emailErrMsg = result;
      });
      this.translateService.get("W0122").subscribe((result: string) => {
        this.viewModel.pwErrMsg = result;
      });
    });
  }

  ngOnDestroy() {
    this.viewModel = null;
  }
  //login 시
  login() {

    this.viewModel.isEmailInvalid = ((this.viewModel.email.length == 0) || (!this.validEmail(this.viewModel.email)));

    //email Checked
    if(this.viewModel.isEmailInvalid) {

      if(this.viewModel.email.length == 0) {
        this.translateService.get("S0016").subscribe((result: string) => {
          this.viewModel.emailErrMsg = result;
        });
      } else {
        this.translateService.get("S0017").subscribe((result: string) => {
          this.viewModel.emailErrMsg = result;
        });
      }
      this.viewModel.email = '';
      return;
    }

    this.viewModel.isPwInvalid = this.viewModel.pw.length == 0;
    if(this.viewModel.isPwInvalid) {
      // this.viewModel.pwErrMsg = this.translateService.instant("W0122");
      this.translateService.get("S0018").subscribe((result: string) => {
        this.viewModel.pwErrMsg = result;
      });
      this.viewModel.pw = '';
      return;
    }
    this.userService.authenticate(this.viewModel.email, this.viewModel.pw, this.signInCallback);
  }

  validEmail(data: any): boolean {
    let pattern=new RegExp(EmailRegEx);
    return pattern.test(data);
  }

  inputEmail(data: any) {
    if(this.viewModel.email.length > 0)
      this.viewModel.isEmailInvalid = false;
  }

  inputPassword(data: any) {
    if(this.viewModel.pw.length > 0)
      this.viewModel.isPwInvalid = false;
  }
  authGoogle() {
    console.log("authGoogle" +this.viewModel.authType);
    if(this.viewModel.gAuthCode.length == 0) {
      this.translateService.get("S0020").subscribe((result: string) => {
        this.viewModel.gAuthErrMsg = result;
        this.viewModel.gAuthErr = true;
      });

      return;
    }

    //TODO 인증코드 맞는지 체크는 우선 패스한다.
    // this.userService.loginSub(true);
    // console.log("hi:::"+this.tymxRouterService.getPreviousUrl());
    // this.router.navigate([this.tymxRouterService.getPreviousUrl()]);
    if(this.viewModel.authType==0) {
      this.confirmCodeCallBack('SOFTWARE_TOKEN_MFA');
    } else {
      this.authGoogleWithResult();
    }

  }
  authGoogleWithResult() {
    this.confirmCodeCallBack(this.viewModel.gAuthCode);
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
    // this.userService.loginSub(true);
    // this.router.navigate([this.tymxRouterService.getPreviousUrl()]);
    this.confirmCodeCallBack(this.viewModel.smsAuthCode);
  }

  sendSmsAuth() {
    if(this.viewModel.authType==0) {
      this.confirmCodeCallBack('SMS_MFA');
    }
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
  isLoggedIn(message: string, isLoggedIn: boolean) {
    if (isLoggedIn) {
      this.router.navigate(['/login/auth']);
      console.log('isLoggedIn');
    }
  }
}
//login model
export class ViewModel {
  loginStep: number; //0: 로그인창, 1: 인증창
  authType: number; //0: 둘다, 1: 구글 2: sms, -1 : undefined
  email: string;
  pw: string;
  emailErrMsg: string;
  pwErrMsg: string;
  isEmailInvalid: boolean;
  isPwInvalid: boolean;
  enableGoogle: boolean;
  enableSms: boolean;
  gAuthCode: string;
  gAuthErr: boolean;
  gAuthErrMsg: string;
  smsAuthCode: string;
  smsAuthErr: boolean;
  smsAuthErrMsg: string;
  smsSendCount: number;

  constructor() {
    this.loginStep = 0;
    this.authType = -1;
    this.email = '';
    this.pw = '';
    this.emailErrMsg = '';
    this.pwErrMsg = '';
    this.isEmailInvalid = false;
    this.isPwInvalid = false;
    this.enableGoogle = true;
    this.enableSms = true;
    this.gAuthCode = '';
    this.gAuthErr = false;
    this.gAuthErrMsg = '';
    this.smsAuthCode = '';
    this.smsAuthErr = false;
    this.smsAuthErrMsg = '';
    this.smsSendCount = 0;
  }
}
export class SignInCallback implements CognitoCallback {
  component: LoginComponent;
  constructor(component: LoginComponent) {
    this.component = component;
  }
  cognitoCallback(message: string, result: any) {
    if (message != null) {
      console.log(message);
    } else {
      console.log('cognitoCallback');
      this.component.router.navigate([this.component.tymxRouterService.getPreviousUrl()]);
      this.component.userService.loginSub(true);
    }
  }
  handleMFAStep(challengeName: string, challengeParameters: any, callback: (confirmationCode: string) => any): void {

    this.component.viewModel.loginStep = 1;
    this.component.confirmCodeCallBack = callback;
    if(challengeName == 'SMS_MFA') {
      this.component.sendSmsAuth();
      if(this.component.viewModel.authType == -1) {
        this.component.viewModel.authType = 2;
        this.component.viewModel.enableGoogle = false;
        this.component.viewModel.enableSms = true;
      }
    }
    else if (challengeName == 'SOFTWARE_TOKEN_MFA') {

      if(this.component.viewModel.authType == -1) {
        this.component.viewModel.authType = 1;
        this.component.viewModel.enableGoogle = true;
        this.component.viewModel.enableSms = false;
      }
      if (this.component.viewModel.authType == 0) {
        this.component.authGoogleWithResult();
      }
    }
    else if(challengeName == 'SELECT_MFA_TYPE') {
      this.component.viewModel.enableGoogle = true;
      this.component.viewModel.enableSms = true;
      this.component.viewModel.authType = 0;
    }
  }
}
