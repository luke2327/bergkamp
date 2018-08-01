import { Component, OnInit, AfterViewInit, OnDestroy } from '@angular/core';
import { TranslateService } from '@ngx-translate/core';
import { Router } from "@angular/router";
import { EmailRegEx } from '../../app.const';
import { UserLoginService } from "../../aws-appsync/service/user-login.service";
import { CognitoCallback, LoggedInCallback } from "../../aws-appsync/service/cognito.service";
@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.sass']
})
export class LoginComponent implements OnInit, AfterViewInit, OnDestroy, CognitoCallback, LoggedInCallback {

  viewModel: LoginModel;

  constructor(private translateService: TranslateService,
              public router: Router,
              public userService: UserLoginService) {

  }

  ngOnInit() {
    this.viewModel = new LoginModel();
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
    this.userService.authenticate(this.viewModel.email, this.viewModel.pw, this);
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
  cognitoCallback(message: string, result: any) {
    if (message != null) {
      console.log(message);
      //error
      // this.errorMessage = message;
      // console.log("result: " + this.errorMessage);
      // if (this.errorMessage === 'User is not confirmed.') {
      //   console.log("redirecting");
      //   // this.router.navigate(['/home/confirmRegistration', this.email]);
      // } else if (this.errorMessage === 'User needs to set password.') {
      //   console.log("redirecting to set new password");
      //   // this.router.navigate(['/home/newPassword']);
      // }
    } else {
      console.log('cognitoCallback');
      this.router.navigate(['/login/auth']);
      this.userService.loginSub(true);
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
export class LoginModel {
  email: string = '';
  pw: string = '';
  emailErrMsg: string = '';
  pwErrMsg: string = '';
  isEmailInvalid: boolean = false;
  isPwInvalid: boolean = false;
}
