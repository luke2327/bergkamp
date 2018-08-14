import { Component, OnInit, AfterViewInit, OnDestroy } from '@angular/core';
import { TranslateService, LangChangeEvent } from '@ngx-translate/core';
import { Router } from "@angular/router";
import { EmailRegEx } from '../../app.const';
import { UserRegService } from "../../aws-appsync/service/user-reg.service";
import { CognitoCallback } from "../../aws-appsync/service/cognito.service";
@Component({
  selector: 'app-signup',
  templateUrl: './signup.component.html',
  styleUrls: ['./signup.component.sass']
})
//가입및 이메일 인증과정
//원래는 두페이지로 하려고 했으나
//한 페이지에서 처리하는것이 보안상 이슈를 적게 할수 있을거 같아서
//두페이지로 나누면 다음페이지에 어떻게든 email을 전송해야함
export class SignupComponent implements OnInit, AfterViewInit, OnDestroy {
  public viewModel: ViewModel;
  public regUser: RegUser;
  constructor(public translateService: TranslateService,
              public userRegService: UserRegService,
              public router: Router) {

  }

  ngOnInit() {
    this.viewModel = new ViewModel();
    this.viewModel.lang = this.translateService.currentLang;
  }

  ngAfterViewInit() {
    this.translateService.onLangChange.subscribe((event: LangChangeEvent) => {

      this.viewModel.lang = this.translateService.currentLang;
    });
  }

  ngOnDestroy() {}

  checkTermToggle() {
    this.viewModel.isCheckTerms = !this.viewModel.isCheckTerms;
    if(this.viewModel.isCheckTerms)
      this.viewModel.isCheckTermsErr = false;
  }

  inputEmail(data: string) {
    if(data.length>0)
      this.viewModel.isEmailErr = false;
  }

  inputPw(data: string) {
    if(data.length>0)
      this.viewModel.isPwErr = false;
  }

  inputRePw(data: string) {
    if(data.length>0)
      this.viewModel.isRePwErr = false;
  }

  validEmail(data: any): boolean {
    let pattern=new RegExp(EmailRegEx);
    return pattern.test(data);
  }
  validPw(data: any): boolean {
    return data.length>=8 && data.length<=20;
  }
  signup() {
    //이메일 유효성 검사
    if(this.viewModel.email.length == 0) {
      this.translateService.get("S0016").subscribe((result: string) => {
        this.viewModel.emailErrMsg = result;
      });
      this.viewModel.isEmailErr = true;
      return;
    }
    if(!this.validEmail(this.viewModel.email)) {
      this.translateService.get("S0017").subscribe((result: string) => {
        this.viewModel.emailErrMsg = result;
      });
      this.viewModel.isEmailErr = true;
      return;
    }
    //비번 유효성 검사
    if(this.viewModel.pw.length == 0) {
      this.translateService.get("S0018").subscribe((result: string) => {
        this.viewModel.pwErrMsg = result;
      });
      this.viewModel.isPwErr = true;
      return;
    }
    if(!this.validPw(this.viewModel.pw)) {
      this.translateService.get("S0024").subscribe((result: string) => {
        this.viewModel.pwErrMsg = result;
      });
      this.viewModel.isPwErr = true;
      return;
    }
    //비번확인 유효성 검사
    if(this.viewModel.rePw.length == 0) {
      this.translateService.get("S0025").subscribe((result: string) => {
        this.viewModel.rePwErrMsg = result;
      });
      this.viewModel.isRePwErr = true;
      return;
    }
    if(this.viewModel.rePw != this.viewModel.pw) {
      this.translateService.get("S0026").subscribe((result: string) => {
        this.viewModel.rePwErrMsg = result;
      });
      this.viewModel.isRePwErr = true;
      return;
    }
    //체크박스는 했냐?
    if(!this.viewModel.isCheckTerms) {
      this.viewModel.isCheckTermsErr = true;
      return;
    }
    //아직 정확하지 않으므로 일단 대충 해둔다.
    let countryCode = JSON.parse(localStorage.getItem('geoloc')).country.code;
    this.regUser = new RegUser();
    this.regUser.email = this.viewModel.email;
    this.regUser.password = this.viewModel.pw;
    this.regUser.name = this.viewModel.email;
    this.regUser.locale = this.translateService.currentLang+"-"+countryCode;
    this.userRegService.register(this.regUser,  new SignupCallback(this));
  }
  resend() {
    this.userRegService.resendCode(this.viewModel.email, new ResendCallback(this));
  }

  login() {
    this.router.navigate(['/login']);
  }
  confirm() {
    this.userRegService.confirmRegistration(this.viewModel.email, this.viewModel.confirmCode, new ConfirmCallback(this));
  }
}
export class SignupCallback implements CognitoCallback {
  constructor(public component: SignupComponent) {}

  cognitoCallback(message: string, result: any) {
    console.log(message);
    console.log(result);
    if (message != null) { //error
      if(message.includes("An account with the given email already exists.")
        ||message.includes("User already exists")) {
        this.component.viewModel.isEndSignup = true;
      }
    } else { //success
      //move to the next step
      // this.router.navigate(['/signup/auth']);
      this.component.viewModel.isEndSignup = true;
    }
  }
}
export class ConfirmCallback implements CognitoCallback {
  constructor(public component: SignupComponent) {}

  cognitoCallback(message: string, result: any) {
    if (message != null) { //error
    } else { //success
      //move to the next step
      this.component.viewModel.needConfirm = false;
    }
  }
}

export class ResendCallback implements CognitoCallback {
  constructor(public component: SignupComponent) {}

  cognitoCallback(message: string, result: any) {
    if (message != null) { //error
    } else { //success
      //move to the next step
      //TODO popup을 추후에 뭔가 띄우지 않을까
    }
  }
}

//app.model에 정리하다보니 쓸데없이 코드가 몰려있는데다가 변수명도 길어져
//그냥 각각의 component에다가 모델을 선언하는 방식으로
//바꾸려고 함
//앞에 개발한것들은 다시 수정을 가할때 하나씩 바꾸기로 하자.
export class ViewModel {
  email: string = "";
  isEmailErr: boolean = false;
  emailErrMsg: string = "";
  pw: string = "";
  isPwErr: boolean = false;
  pwErrMsg: string = "";
  rePw: string = "";
  isRePwErr: boolean = false;
  rePwErrMsg: string = "";
  isCheckTerms: boolean = false;
  isCheckTermsErr: boolean = false;
  lang: string = "en";
  isEndSignup: boolean = false;
  needConfirm: boolean = true;
  confirmCode: string = '';
}
export class RegUser {
  name: string;
  email: string;
  password: string;
  locale: string;
}
