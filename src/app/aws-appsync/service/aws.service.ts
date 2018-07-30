import { Injectable } from '@angular/core';
import { Callback, CognitoService } from "./cognito.service";
import * as AWS from "aws-sdk/global";
@Injectable()
export class AwsService {

  public static firstLogin: boolean = false;
  public static runningInit: boolean = false;

  constructor(public cognito: CognitoService) {
    AWS.config.region = CognitoService._REGION;
  }

  /**
   * This is the method that needs to be called in order to init the aws global creds
   */
  initAwsService(callback: Callback, isLoggedIn: boolean, idToken: string) {

    if (AwsService.runningInit) {
        // Need to make sure I don't get into an infinite loop here, so need to exit if this method is running already
      console.log("AwsService: Aborting running initAwsService()...it's running already.");
      // instead of aborting here, it's best to put a timer
      if (callback != null) {
        callback.callback();
        callback.callbackWithParam(null);
      }
      return;
    }


    console.log("AwsService: Running initAwsService()");
    AwsService.runningInit = true;


    let mythis = this;
    // First check if the user is authenticated already
    if (isLoggedIn)
      mythis.setupAWS(isLoggedIn, callback, idToken);

  }


  /**
   * Sets up the AWS global params
   *
   * @param isLoggedIn
   * @param callback
   */
   setupAWS(isLoggedIn: boolean, callback: Callback, idToken: string): void {
    console.log("AwsService: in setupAWS()");
    if (isLoggedIn) {
      console.log("AwsService: User is logged in");
      // Setup mobile analytics
      var options = {
          appId: '32673c035a0b40e99d6e1f327be0cb60',
          appTitle: "aws-cognito-angular2-quickstart"
      };

      // TODO: The mobile Analytics client needs some work to handle Typescript. Disabling for the time being.
      // var mobileAnalyticsClient = new AMA.Manager(options);
      // mobileAnalyticsClient.submitEvents();

      this.addCognitoCredentials(idToken);

      console.log("AwsService: Retrieving the id token");

    }
    else {
      console.log("AwsService: User is not logged in");
    }

    if (callback != null) {
      callback.callback();
      callback.callbackWithParam(null);
    }

    AwsService.runningInit = false;
  }

  addCognitoCredentials(idTokenJwt: string): void {
    let creds = this.cognito.buildCognitoCreds(idTokenJwt);

    AWS.config.credentials = creds;

    creds.get(function (err) {
      if (!err) {
        if (AwsService.firstLogin) {
            // save the login info to DDB
          this.ddb.writeLogEntry("login");
          AwsService.firstLogin = false;
        }
      }
    });
  }

  static getCognitoParametersForIdConsolidation(idTokenJwt: string): {} {
    console.log("AwsService: enter getCognitoParametersForIdConsolidation()");
    let url = 'cognito-idp.' + CognitoService._REGION.toLowerCase() + '.amazonaws.com/' + CognitoService._USER_POOL_ID;
    let logins: Array<string> = [];
    logins[url] = idTokenJwt;
    let params = {
      IdentityPoolId: CognitoService._IDENTITY_POOL_ID, /* required */
      Logins: logins
    };

    return params;
  }

}
