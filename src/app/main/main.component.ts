import { Component, OnInit, OnDestroy  } from '@angular/core';
import { AppsyncService } from '../aws-appsync/service/appsync.service';
import GetSnapshot from '../aws-appsync/query/get-snapshot';
import AWSAppSyncClient from 'aws-appsync';
import { ObservableQuery } from 'apollo-client';
import { SnapshotService } from '../aws-appsync/service/snapshot.service';
import { SnapshotDataService } from '../aws-appsync/service/snapshot-data.service';
import { HistoryService } from '../aws-appsync/service/history.service';
import { UserLoginService } from "../aws-appsync/service/user-login.service";
import { GeolocationService } from '../rest-api/service/geolocation.service';
import { GeolocationDataService } from '../rest-api/service/geolocation-data.service';
import { InfoService } from '../rest-api/service/info.service';
import { InfoDataService } from '../rest-api/service/info-data.service';
import { AwsService } from "../aws-appsync/service/aws.service";
import { CognitoService, LoggedInCallback, Callback } from '../aws-appsync/service/cognito.service';
import * as AWS from "aws-sdk/global";
import { CommonComponent } from "../common/common.component";
import { CompStateService } from '../service/comp-state.service';
@Component({
  selector: 'app-main',
  templateUrl: './main.component.html',
  styleUrls: ['./main.component.sass']
})
export class MainComponent extends CommonComponent implements OnInit, OnDestroy {

  snapshopSubscription: any;
  idToken: any;
  credentials: any;
  constructor(
    public geolocationService: GeolocationService,
    public geolocationDataService: GeolocationDataService,
    public infoService: InfoService,
    public infoDataService: InfoDataService,
    public snapshotService: SnapshotService,
    public historyService: HistoryService,
    public snapshotDataService: SnapshotDataService,
    public cognitoService: CognitoService,
    public userLoginService: UserLoginService,
    public appsyncService: AppsyncService,
    public compStateService: CompStateService
  ) {
    super(geolocationService, geolocationDataService,
          infoService, infoDataService,
          userLoginService, compStateService,
          cognitoService);
  }

  startComponent() {
    this.appsyncService.setClient(this.token);
    this.startSnapshot();
  }
  startComponentErr() {

  }
  ngOnDestroy() {
    this.snapshotService.stopSub();
    this.geolocationSub.unsubscribe();
    this.infoDataSub.unsubscribe();
    if(this.snapshopSubscription!=null)
      this.snapshopSubscription.unsubscribe();
  }

  startSnapshot() {
    this.snapshotService.startObserver();
    this.snapshopSubscription = this.snapshotService.queryObservable.subscribe((value) => {
      this.snapshotDataService.setSnapshot(value);
    });
  }
}
