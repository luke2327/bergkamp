import { Component, OnInit, OnDestroy  } from '@angular/core';
import { AppsyncService } from '../aws-appsync/service/appsync.service';
import GetSnapshot from '../aws-appsync/query/get-snapshot';
import AWSAppSyncClient from 'aws-appsync';
import { ObservableQuery } from 'apollo-client';
import { SnapshotService } from '../aws-appsync/service/snapshot.service';
import { SnapshotDataService } from '../aws-appsync/service/snapshot-data.service';
import { HistoryService } from '../aws-appsync/service/history.service';
import { UserLoginService } from "../aws-appsync/service/user-login.service";
import { AwsService } from "../aws-appsync/service/aws.service";
import { CognitoService, LoggedInCallback, Callback } from '../aws-appsync/service/cognito.service';
import * as AWS from "aws-sdk/global";
@Component({
  selector: 'app-main',
  templateUrl: './main.component.html',
  styleUrls: ['./main.component.sass']
})
export class MainComponent implements OnInit, OnDestroy, LoggedInCallback {

  snapshopSubscription: any;
  idToken: any;
  credentials: any;
  constructor(private snapshotService: SnapshotService,
              private historyService: HistoryService,
              private snapshotDataService: SnapshotDataService,
              public cognitoService: CognitoService,
              private userLoginService: UserLoginService,
              private awsService: AwsService) { }

  ngOnInit() {
    this.userLoginService.isAuthenticated(this);
  }

  ngOnDestroy() {
    if(this.snapshopSubscription!=null)
      this.snapshopSubscription.unsubscribe();
  }
  isLoggedIn(message: string, isLoggedIn: boolean) {
    if(isLoggedIn) {
      let mythis = this;
      this.cognitoService.getIdToken({
        callback() {

        },
        callbackWithParam(token: any) {
          mythis.startSnapshot();
        }
      });
    }
  }
  startSnapshot() {
    this.snapshotService.startObserver();
    this.snapshopSubscription = this.snapshotService.queryObservable.subscribe((value) => {
      this.snapshotDataService.setSnapshot(value);
    });
  }
}
