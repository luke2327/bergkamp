import { Component, OnInit, AfterViewInit, OnDestroy } from '@angular/core';
import { TranslateService } from '@ngx-translate/core';
import { Router } from "@angular/router";
import { TymxRouterService } from "../../service/tymx-router.service";
import { Callback } from "../../aws-appsync/service/cognito.service";
import { UserLoginService } from "../../aws-appsync/service/user-login.service";
import { UserParametersService } from "../../aws-appsync/service/user-parameters.service";
@Component({
  selector: 'app-pw-change',
  templateUrl: './pw-change.component.html',
  styleUrls: ['./pw-change.component.sass']
})
export class PwChangeComponent implements OnInit, AfterViewInit, OnDestroy {
  public viewModel: ViewModel;

  constructor(public translateService: TranslateService,
              public router: Router,
              public userService: UserLoginService,
              public userParametersService: UserParametersService,
              public tymxRouterService: TymxRouterService) { }

  ngOnInit() {
    this.viewModel = new ViewModel();
  }
  ngAfterViewInit() {
  }

  ngOnDestroy() {

  }

  submit() {
    //현재 비번입력이 없을때
    if(this.viewModel.currPw.length == 0) {
      this.viewModel.isCurrPwErr = true;
      this.translateService.get("S0018").subscribe((result: string) => {
        this.viewModel.currPwErrMsg = result;
      });
      return;
    }
    //새 비번입력이 없을때
    if(this.viewModel.newPw.length == 0) {
      this.viewModel.isNewPwErr = true;
      this.translateService.get("S0018").subscribe((result: string) => {
        this.viewModel.newPwErrMsg = result;
      });
      return;
    }
    //비번확인 입력이 없을때
    if(this.viewModel.confirmPw.length == 0) {
      this.viewModel.isConfirmPwErr = true;
      this.translateService.get("S0025").subscribe((result: string) => {
        this.viewModel.confirmPwErrMsg = result;
      });
      return;
    }
    //새 비번의 길이가 맞지 않을때
    if(this.viewModel.newPw.length < 8 || this.viewModel.newPw.length > 20) {
      this.viewModel.isNewPwErr = true;
      this.translateService.get("S0024").subscribe((result: string) => {
        this.viewModel.newPwErrMsg = result;
      });
      return;
    }
    //새 비번과 비번확인 입력이 일치하지 않을때
    if(this.viewModel.confirmPw != this.viewModel.newPw) {
      this.viewModel.isConfirmPwErr = true;
      this.translateService.get("S0026").subscribe((result: string) => {
        this.viewModel.confirmPwErrMsg = result;
      });
      return;
    }
    //새 비번이 기존의 비번의 입력과 같을때
    if(this.viewModel.currPw == this.viewModel.newPw) {
      this.viewModel.isNewPwErr = true;
      this.translateService.get("S0049").subscribe((result: string) => {
        this.viewModel.confirmPwErrMsg = result;
      });
      return;
    }
    this.userParametersService.changePassword(this.viewModel.currPw, this.viewModel.newPw, new PwChangeCallBack(this));
  }

  inCurrPw(data: any) {
    if(this.viewModel.currPw.length > 0) {
      this.viewModel.isCurrPwErr = false;
    }
  }

  inNewPw(data: any) {
    if(this.viewModel.newPw.length > 0) {
      this.viewModel.isNewPwErr = false;
    }
  }

  inConfirmPw(data: any) {
    if(this.viewModel.confirmPw.length > 0) {
      this.viewModel.isConfirmPwErr = false;
    }
  }

}
export class ViewModel {
  pageStep: number; //0: 비밀번호 입력화면 1: 2FA 입력화면
  currPw: string;
  newPw: string;
  confirmPw: string;
  isCurrPwErr: boolean;
  isNewPwErr: boolean;
  isConfirmPwErr: boolean;
  currPwErrMsg: string;
  newPwErrMsg: string;
  confirmPwErrMsg: string;
  cognitoPw: string;

  constructor() {
    this.pageStep = 0;
    this.currPw = '';
    this.newPw = '';
    this.confirmPw = '';
    this.isCurrPwErr = false;
    this.isNewPwErr = false;
    this.isConfirmPwErr = false;
    this.currPwErrMsg = '';
    this.newPwErrMsg = '';
    this.confirmPwErrMsg = '';
  }
}
export class PwChangeCallBack implements Callback {
  constructor(public component: PwChangeComponent) {}
  callback(): void {}

  callbackWithParam(result: any): void {
    if(result.includes('SUCCESS')) {
      this.component.router.navigate([this.component.tymxRouterService.getPreviousUrl()]);
    } else {
      this.component.viewModel.isCurrPwErr = true;
      this.component.translateService.get("S0019").subscribe((result: string) => {
        this.component.viewModel.currPwErrMsg = result;
      });
    }
  }
}
