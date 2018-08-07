import { Injectable } from '@angular/core';
import { config } from "../../aws-appsync/config";
import { CognitoCallback, CognitoService, LoggedInCallback } from "./cognito.service";
import { AuthenticationDetails, CognitoUser, CognitoUserSession, CognitoUserAttribute } from "amazon-cognito-identity-js";
import * as AWS from "aws-sdk/global";
import * as STS from "aws-sdk/clients/sts";
import { Subject } from 'rxjs/Subject';
@Injectable()
export class UserLoginService {

  loginSubject: any;
  guestId: any;
  guestPw: any;
  private onLoginSuccess = (callback: CognitoCallback, session: CognitoUserSession) => {
    console.log(session);
    AWS.config.credentials = this.cognitoUtil.buildCognitoCreds(session.getIdToken().getJwtToken());
    console.log(AWS.config.credentials);
    let clientParams: any = {};
    if (config.sts_endpoint) {
      clientParams.endpoint = config.sts_endpoint;
    }
    let sts = new STS(clientParams);
    sts.getCallerIdentity(function (err, data) {
      console.log("UserLoginService: Successfully set the AWS credentials");
      callback.cognitoCallback(null, session);
    });
  }

  private onLoginError = (callback: CognitoCallback, err) => {
    callback.cognitoCallback(err.message, null);

  }

  constructor(public cognitoUtil: CognitoService) {
    this.loginSubject = new Subject();
    this.guestId = 'guest@tymx.com';
    this.guestPw = 'rptmxm01';
  }
  autenticateGuest(callback: CognitoCallback) {
    console.log('this.guestId, this.guestPw');
    console.log(this.guestId);
    console.log(this.guestPw);
    this.authenticate(this.guestId, this.guestPw, callback);
  }
  authenticate(username: string, password: string, callback: CognitoCallback) {
    console.log("UserLoginService: starting the authentication");
    console.log(username);
    console.log(password);
    let authenticationData = {
      Username: username,
      Password: password,
    };
    let authenticationDetails = new AuthenticationDetails(authenticationData);

    let userData = {
      Username: username,
      Pool: this.cognitoUtil.getUserPool()
    };

    console.log("UserLoginService: Params set...Authenticating the user");
    let cognitoUser = new CognitoUser(userData);
    console.log("UserLoginService: config is " + AWS.config);
    cognitoUser.authenticateUser(authenticationDetails, {
      newPasswordRequired: (userAttributes, requiredAttributes) => callback.cognitoCallback(`User needs to set password.`, null),
      onSuccess: result => this.onLoginSuccess(callback, result),
      onFailure: err => this.onLoginError(callback, err),
      mfaRequired: (challengeName, challengeParameters) => {
        console.log("mfaRequired");
        callback.handleMFAStep(challengeName, challengeParameters, (confirmationCode: string) => {

          cognitoUser.sendMFACode(confirmationCode, {
            onSuccess: result => this.onLoginSuccess(callback, result),
            onFailure: err => this.onLoginError(callback, err)
          });
        });
      },
      selectMFAType : function(challengeName, challengeParameters) {
        console.log('selectMFAType');
        console.log(challengeName);
        console.log(challengeParameters);
        // var mfaType = prompt('Please select the MFA method.', ''); // valid values for mfaType is "SMS_MFA", "SOFTWARE_TOKEN_MFA"
        // cognitoUser.sendMFASelectionAnswer(mfaType, this);
        callback.handleMFAStep(challengeName, challengeParameters, (confirmationCode: string) => {

          console.log(confirmationCode);
          cognitoUser.sendMFASelectionAnswer(confirmationCode, this);
        });
      },
      totpRequired : function(secretCode) {
        // var challengeAnswer = prompt('Please input the TOTP code.' ,'');
        // cognitoUser.sendMFACode(challengeAnswer, this, 'SOFTWARE_TOKEN_MFA');
        callback.handleMFAStep('SOFTWARE_TOKEN_MFA', null, (confirmationCode: string) => {

          cognitoUser.sendMFACode(confirmationCode, this, 'SOFTWARE_TOKEN_MFA');
        });
      }
    });
  }

  authenticateMfa(username: string, password: string, callback: CognitoCallback) {
    console.log("UserLoginService: starting the authentication");

    let authenticationData = {
      Username: username,
      Password: password,
    };
    let authenticationDetails = new AuthenticationDetails(authenticationData);

    let userData = {
      Username: username,
      Pool: this.cognitoUtil.getUserPool()
    };

    console.log("UserLoginService: Params set...Authenticating the user");
    let cognitoUser = new CognitoUser(userData);
    cognitoUser.authenticateUser(authenticationDetails, {
       onSuccess: function (result) {
         console.log('onSuccess: function');
         console.log(result);
         var accessToken = result.getAccessToken().getJwtToken();
       },

       onFailure: function(err) {
         console.log('onFailure: function');
           alert(err.message || JSON.stringify(err));
       },

       mfaSetup: function(challengeName, challengeParameters) {
         console.log('mfaSetup: function');

       }
     });
  }

  forgotPassword(username: string, callback: CognitoCallback) {
    let userData = {
      Username: username,
      Pool: this.cognitoUtil.getUserPool()
    };

    let cognitoUser = new CognitoUser(userData);

    cognitoUser.forgotPassword({
      onSuccess: function () {

      },
      onFailure: function (err) {
        callback.cognitoCallback(err.message, null);
      },
      inputVerificationCode() {
        callback.cognitoCallback(null, null);
      }
    });
  }

  confirmNewPassword(email: string, verificationCode: string, password: string, callback: CognitoCallback) {
    let userData = {
      Username: email,
      Pool: this.cognitoUtil.getUserPool()
    };

    let cognitoUser = new CognitoUser(userData);

    cognitoUser.confirmPassword(verificationCode, password, {
      onSuccess: function () {
          callback.cognitoCallback(null, null);
      },
      onFailure: function (err) {
          callback.cognitoCallback(err.message, null);
      }
    });
  }


  logout() {
    console.log("UserLoginService: Logging out");
    this.cognitoUtil.getCurrentUser().signOut();

  }
  //0: not loggedIn, 1: guestLogin, 2: userLogin
  isAuthenticatedLevel(callback: CognitoCallback) {
    let guestId = this.guestId;
    if (callback == null)
      throw("UserLoginService: Callback in isAuthenticated() cannot be null");

    let cognitoUser = this.cognitoUtil.getCurrentUser();

    if (cognitoUser != null) {
      cognitoUser.getSession(function (err, session) {
        if (err) {
          console.log("UserLoginService: Couldn't get the session: " + err, err.stack);
          callback.cognitoCallback(null, 0);
        }
        else {
          if(session.idToken.payload.email == guestId) {
            callback.cognitoCallback(null, 1);
          } else {
            callback.cognitoCallback(null, 2);
          }
        }
      });
    } else {
      callback.cognitoCallback(null, 0);
    }
  }

  isAuthenticated(callback: LoggedInCallback) {
    if (callback == null)
      throw("UserLoginService: Callback in isAuthenticated() cannot be null");

    let cognitoUser = this.cognitoUtil.getCurrentUser();

    if (cognitoUser != null) {
      cognitoUser.getSession(function (err, session) {
        if (err) {
          console.log("UserLoginService: Couldn't get the session: " + err, err.stack);
          callback.isLoggedIn(err, false);
        }
        else {

          console.log("UserLoginService: Session is " + session.isValid());
          callback.isLoggedIn(err, session.isValid());
        }
      });
    } else {
      console.log("UserLoginService: can't retrieve the current user");
      callback.isLoggedIn("Can't retrieve the CurrentUser", false);
    }
  }

  loginSub(isLogin: boolean) {
    this.loginSubject.next(isLogin);
  }
}
