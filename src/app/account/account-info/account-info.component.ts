import { Component, OnInit, AfterViewInit, OnDestroy } from '@angular/core';
import { TranslateService } from '@ngx-translate/core';
import { UserLoginService } from "../../aws-appsync/service/user-login.service";
import { UserParametersService } from "../../aws-appsync/service/user-parameters.service";
import { CognitoService, LoggedInCallback, Callback, CognitoCallback } from "../../aws-appsync/service/cognito.service";
import { Router } from "@angular/router";
import { SpecialRegEx } from '../../app.const';
@Component({
  selector: 'app-account-info',
  templateUrl: './account-info.component.html',
  styleUrls: ['./account-info.component.sass']
})
export class AccountInfoComponent implements OnInit, AfterViewInit, OnDestroy, LoggedInCallback {
  public viewModel: ViewModel;
  public userInfo: any;
  constructor(public router: Router,
              public translateService: TranslateService,
              public userLoginService: UserLoginService,
              public userParametersService: UserParametersService,
              public cognitoService: CognitoService) {

    this.userLoginService.isAuthenticated(this);
  }

  ngOnInit() {
    this.viewModel = new ViewModel();
  }
  ngAfterViewInit() {}
  ngOnDestroy() {}
  changeNickname() {
    console.log("change!!!!");
    if(this.viewModel.inputNickname.length == 0) {
      this.translateService.get("S0046").subscribe((result: string) => {
        this.viewModel.nicknameErrMsg = result;
        this.viewModel.isErrNickname = true;
      });
      return;
    }
    if(this.viewModel.inputNickname.length < 5 || this.viewModel.inputNickname.length > 15) {
      this.translateService.get("S0044").subscribe((result: string) => {
        this.viewModel.nicknameErrMsg = result;
        this.viewModel.isErrNickname = true;
      });
      return;
    }
    if(this.isSpecialChar(this.viewModel.inputNickname)) {
      this.translateService.get("S0043").subscribe((result: string) => {
        this.viewModel.nicknameErrMsg = result;
        this.viewModel.isErrNickname = true;
      });
      return;
    }
    let attribute = {
      Name : 'nickname',
      Value : this.viewModel.inputNickname
    };
    this.userParametersService.updateAttr(attribute, new ChangeNicknameCallback(this));
  }
  isSpecialChar(data: any): boolean {
    let pattern=new RegExp(SpecialRegEx);
    return pattern.test(data);
  }
  inputNickname(data: any) {
    if(data>0)
      this.viewModel.isErrNickname = false;
  }
  isLoggedIn(message: string, isLoggedIn: boolean) {
    if (!isLoggedIn) {
      this.router.navigate(['/']);
    } else {
      this.userParametersService.getParameters(new AccountInfoCallback(this, this.cognitoService));
    }
  }

  public setViewModel() {
    this.viewModel.email = this.userInfo.get('email');
    this.viewModel.nickname = this.userInfo.get('nickname');
  }
}

export class ViewModel {
  email: string;
  nickname: string;
  isInputMode: boolean;
  inputNickname: string;
  isErrNickname: boolean;
  nicknameErrMsg: string;
  constructor() {
    this.email = "";
    this.nickname = "";
    this.isInputMode = false;
    this.inputNickname = "";
    this.isErrNickname = false;
    this.nicknameErrMsg = "";
  }
}
//account 정보를 가져오는 callback
export class AccountInfoCallback implements Callback {

  constructor(public accountInfo: AccountInfoComponent, public cognitoService: CognitoService) {

  }

  callback() {}

  callbackWithParam(result: any) {
    this.accountInfo.userInfo = new Map();
    for (let entry of result) {
      this.accountInfo.userInfo.set(entry.getName(), entry.getValue());
    }

    this.accountInfo.setViewModel();
  }
}

export class ChangeNicknameCallback implements Callback {
  constructor(public accountInfo: AccountInfoComponent) {

  }
  callback() {}
  callbackWithParam(result: any) {
    console.log("change::::"+result);
    if(result==null) {
      //TODO error처리
      return;
    }
    this.accountInfo.viewModel.isInputMode = false;
    this.accountInfo.userParametersService.getParameters(new AccountInfoCallback(this.accountInfo, this.accountInfo.cognitoService));
  }
}
