import { Component, OnInit, AfterViewInit, OnDestroy } from '@angular/core';
import { TranslateService } from '@ngx-translate/core';
import { Router } from "@angular/router";
import { TymxRouterService } from "../../service/tymx-router.service";
import { UserParametersService } from "../../aws-appsync/service/user-parameters.service";
import { Callback } from "../../aws-appsync/service/cognito.service";
@Component({
  selector: 'app-g-auth',
  templateUrl: './g-auth.component.html',
  styleUrls: ['./g-auth.component.sass']
})
//구글인증 등록
//일단은 샘플 데이터 처리만 해두고 넘어간다.
export class GAuthComponent implements OnInit, AfterViewInit, OnDestroy {

  public viewModel: ViewModel;

  constructor(public translateService: TranslateService,
              public router: Router,
              public tymxRouterService: TymxRouterService,
              public userParametersService: UserParametersService) { }

  ngOnInit() {
    this.viewModel = new ViewModel();
    this.userParametersService.getGoogleOtpCode(new GoogleOtpCallback(this));
  }

  ngAfterViewInit() {}

  ngOnDestroy() {}

  inCurrPw(data: any) {
    if(this.viewModel.password.length > 0) {
      this.viewModel.isPwErr = false;
    }
  }

  inCurrAuth(data: any) {
    if(this.viewModel.authCode.length > 0) {
      this.viewModel.isAuthErr = false;
    }
  }

  auth() {
    if(this.viewModel.password.length == 0) {
      this.viewModel.isPwErr = true;
      this.translateService.get("S0018").subscribe((result: string) => {
        this.viewModel.pwErrMsg = result;
      });
      return;
    }

    if(this.viewModel.authCode.length == 0) {
      this.translateService.get("S0020").subscribe((result: string) => {
        this.viewModel.isAuthErr = true;
        this.viewModel.authErrMsg = result;
      });
      return;
    }

    //
    this.userParametersService.changePassword(this.viewModel.password, this.viewModel.password, new PwCheckCallback(this));
  }
}
export class ViewModel {
  key: string;
  password: string;
  authCode: string;
  isPwErr: boolean;
  isAuthErr: boolean;
  pwErrMsg: string;
  authErrMsg: string;

  constructor() {
    this.key = "0";
    this.password = "";
    this.authCode = "";
    this.isPwErr = false;
    this.isAuthErr = false;
    this.pwErrMsg = "";
    this.authErrMsg = "";
  }
}
export class GoogleOtpCallback implements Callback {
  component: GAuthComponent;
  constructor(component: GAuthComponent) {
    this.component = component;
  }
  callback(): void {

  }

  callbackWithParam(result: any): void {
    if(result!=null) {
      console.log(result);
      this.component.viewModel.key = result;
    }
  }
}
export class PwCheckCallback implements Callback {
  component: GAuthComponent;
  constructor(component: GAuthComponent) {
    this.component = component;
  }
  callback(): void {

  }

  callbackWithParam(result: any): void {
    if(result!=null) {
      console.log("result!");
      console.log(result);
      // this.component.viewModel.key = result;
      if(result == 'SUCCESS') {
        console.log("this");
        this.component.userParametersService
          .verifySoftwareToken(this.component.viewModel.authCode,
                               new GoogleOtpCheckCallback(this.component));
        return;
      }
    }
    this.component.viewModel.isPwErr = true;
    this.component.translateService.get("S0025").subscribe((result: string) => {
      this.component.viewModel.pwErrMsg = result;
    });

  }
}
export class GoogleOtpCheckCallback implements Callback {
  component: GAuthComponent;
  constructor(component: GAuthComponent) {
    this.component = component;
  }
  callback(): void {

  }

  callbackWithParam(result: any): void {
    console.log('callbackWithParam'+ result);
    if(result==null) {
      console.log('SUCCESS');
      // this.component.viewModel.key = result;
      this.component.router.navigate([this.component.tymxRouterService.getPreviousUrl()]);
      return;
    }
    this.component.translateService.get("S0021").subscribe((result: string) => {
      this.component.viewModel.isAuthErr = true;
      this.component.viewModel.authErrMsg = result;
    });
  }
}
