import { Injectable, Inject } from '@angular/core';
import AWSAppSyncClient from 'aws-appsync';
import { AppSyncConfig, AppSyncOptions } from '../../app.const';
import { AUTH_TYPE } from 'aws-appsync/lib/link/auth-link';
import { Callback, CognitoService } from "./cognito.service";
import * as AWS from "aws-sdk/global";
@Injectable()
export class AppsyncService {
  hc;
  public idToken: string;
  constructor(public cognitoUtil: CognitoService) {
    //cognito user pool 사용으로 로직변경
    this.cognitoUtil.getIdToken(new JwtCallback(this));
  }

  setClient() {
    const config = {
      url: "https://rsdyr5jruvcgzetcjhyekcynym.appsync-api.us-west-2.amazonaws.com/graphql",
      region: "us-west-2",
      auth: {
        type: AUTH_TYPE.AMAZON_COGNITO_USER_POOLS,
        jwtToken: async () => (await this.idToken)
      }
    };
    const client = new AWSAppSyncClient(config, AppSyncOptions);
    this.hc = client.hydrated;
  }
}
export class JwtCallback implements Callback {
  constructor(public appsync: AppsyncService) {
  }

  callback() {
  }

  callbackWithParam(result) {
    this.appsync.idToken = result;
    this.appsync.setClient();
  }
}
