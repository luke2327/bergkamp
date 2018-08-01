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
              callback.callbackWithParam(result);
            }
          });
        }

      });
    } else {
      callback.callbackWithParam(null);
    }


  }

  //닉네임 변경시 사,
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
