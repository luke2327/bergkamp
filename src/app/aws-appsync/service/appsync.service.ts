import { Injectable } from '@angular/core';
import AWSAppSyncClient from 'aws-appsync';
import { AppSyncConfig, AppSyncOptions } from '../../app.const'

@Injectable()
export class AppsyncService {
  hc;
  constructor() {
    //aws 객체를 생성하는류의 service
    const client = new AWSAppSyncClient(AppSyncConfig, AppSyncOptions);
    this.hc = client.hydrated;
  }

}
