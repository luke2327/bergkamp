import { Component, OnInit, AfterViewInit, OnDestroy } from '@angular/core';
import { TranslateService } from '@ngx-translate/core';
import { Router } from "@angular/router";
import { TymxRouterService } from "../../service/tymx-router.service";
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
              public tymxRouterService: TymxRouterService) { }

  ngOnInit() {
    this.viewModel = new ViewModel();
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

    this.router.navigate([this.tymxRouterService.getPreviousUrl()]);
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
