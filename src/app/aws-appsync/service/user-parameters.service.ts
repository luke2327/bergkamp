import { Injectable } from '@angular/core';
import { Callback, CognitoService } from "./cognito.service";
import { AuthenticationDetails, CognitoUser, CognitoUserSession, CognitoUserAttribute } from "amazon-cognito-identity-js";

//유저정보를 cognito로부터 가져온다.
@Injectable()
export class UserParametersService {

  constructor(public cognitoUtil: CognitoService) {
  }

  getParameters(callback: Callback) {
    let cognitoUser = this.cognitoUtil.getCurrentUser();

    if (cognitoUser != null) {
      cognitoUser.getSession(function (err, session) {
        if (err)
          console.log("UserParametersService: Couldn't retrieve the user");
        else {
          cognitoUser.getUserAttributes(function (err, result) {
            if (err) {
              console.log("UserParametersService: in getParameters: " + err);
            } else {
              console.log("result");
              console.log(result);
              callback.callbackWithParam(result);
            }
          });
        }

      });
    } else {
      callback.callbackWithParam(null);
    }


  }

  //코드 받아오기
  getAttrVerificationCode(attr: any, callback: Callback) {
    let cognitoUser = this.cognitoUtil.getCurrentUser();

    if (cognitoUser != null) {
      cognitoUser.getSession(function (err, session) {
        if (err)
          callback.callbackWithParam(null);
        else {
          cognitoUser.getAttributeVerificationCode(attr, {
            onSuccess: function () {
              console.log("S!!!");
              if(attr == "phone_number") {
                cognitoUser.enableMFA(function(err, result) {
                  if (err) {
                    alert(err);
                    return;
                  }
                  console.log('call result: ' + result);
                });
              }
              callback.callback();
            },
            onFailure: function(err) {
              console.log("E!!!");
              console.log(err);
              callback.callbackWithParam(err);
            },
            inputVerificationCode: function() {
              // var verificationCode = prompt('Please input verification code: ' ,'');
              // cognitoUser.verifyAttribute(attr, confirmationCode, this);
              callback.callbackWithConfirm(attr, cognitoUser, this);
            }
          });
        }
      });
    }
  }

  //닉네임 변경시, sms추가시
  updateAttr(attr: any, callback: Callback) {
    let cognitoUser = this.cognitoUtil.getCurrentUser();

    var attributeList = [];
    var attribute = new CognitoUserAttribute(attr);
    attributeList.push(attribute);
    console.log(cognitoUser);
    console.log(attr);
    if (cognitoUser != null) {

      // cognitoUser.getUserAttributes(function (err, result) {
      //   if (err) {
      //     console.log("UserParametersService: in getParameters: " + err);
      //   } else {
      //     console.log(result);
      //   }
      // });
      cognitoUser.getSession(function (err, session) {
        if (err)
          console.log("UserParametersService: Couldn't retrieve the user");
        else {
          cognitoUser.updateAttributes(attributeList, function(err, result) {
            console.log(err);
            if (err) {
              callback.callbackWithParam(null);
              return;
            }
            callback.callbackWithParam(result);
          });
        }

      });
    }

  }
  //구글 OTP 코드 받아오기
  getGoogleOtpCode(callback: Callback) {
    let cognitoUser = this.cognitoUtil.getCurrentUser();
    if (cognitoUser != null) {
      cognitoUser.getSession(function (err, session) {
        if (err)
          console.log("UserParametersService: Couldn't retrieve the user");
        else {
          let results = cognitoUser.associateSoftwareToken({
            onFailure: function (err) {
              // callback.cognitoCallback(err.message, null);
              callback.callbackWithParam(null);
              return;
            },
            associateSecretCode(data: any) {
              callback.callbackWithParam(data);
            }
          });

        }

      });
    }
  }
  verifySoftwareToken(code: any, callback: Callback) {
    console.log("verifySoftwareToken");
    let cognitoUser:CognitoUser = this.cognitoUtil.getCurrentUser();
    // cognitoUser.SetUserMFAPreference(null, null, function(err, result) {
    //   if (err) {
    //     callback.callbackWithParam(err.message);
    //     return;
    //   }
    //   callback.callbackWithParam(null);
    // });
    if (cognitoUser != null) {
      cognitoUser.getSession(function (err, session) {
        if (err)
          console.log("UserParametersService: Couldn't retrieve the user");
        else {
          cognitoUser.verifySoftwareToken(code, 'Google OTP', {
            onFailure: function (err) {
              console.log("verifySoftwareToken_error");
              callback.callbackWithParam(err.message);
              // callback.callbackWithParam(err);
              return;
            },
            onSuccess: function () {
              let totpMfaSettings = {
                PreferredMfa : true,
                Enabled : true
              };
              cognitoUser.setUserMfaPreference(null, totpMfaSettings, function(err, result) {
                if (err) {
                  console.log("setUserMfaPreferencen_error");
                  callback.callbackWithParam(err.message);
                  return;
                }
                callback.callbackWithParam(null);
              });

            }
          });

        }

      });
    }
  }

  changePassword(oldPw: any, newPw: any, callback: Callback) {
    let cognitoUser = this.cognitoUtil.getCurrentUser();

    if (cognitoUser != null) {
      cognitoUser.getSession(function (err, session) {
        if (err)
          console.log("UserParametersService: Couldn't retrieve the user");
        else {
          cognitoUser.changePassword(oldPw, newPw, function(err, result) {
            if (err) {
                console.log('call err: ' + err);
                callback.callbackWithParam(err);
                return;
            }
            callback.callbackWithParam(result);
          });
        }


      });

    }
  }
}
