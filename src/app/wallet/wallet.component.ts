import { Component, OnInit, OnDestroy } from '@angular/core';
import { SnapshotService } from '../aws-appsync/service/snapshot.service';
import { SnapshotDataService } from '../aws-appsync/service/snapshot-data.service';
import { GeolocationService } from '../rest-api/service/geolocation.service';
import { GeolocationDataService } from '../rest-api/service/geolocation-data.service';
import { InfoService } from '../rest-api/service/info.service';
import { InfoDataService } from '../rest-api/service/info-data.service';
import { UserLoginService } from "../aws-appsync/service/user-login.service";
import { CognitoService, LoggedInCallback, Callback } from '../aws-appsync/service/cognito.service';
import { CommonComponent } from "../common/common.component";
import { AppsyncService } from '../aws-appsync/service/appsync.service';
import { CompStateService } from '../service/comp-state.service';
@Component({
  selector: 'app-wallet',
  templateUrl: './wallet.component.html',
  styleUrls: ['./wallet.component.sass']
})
export class WalletComponent extends CommonComponent implements OnInit, OnDestroy {
  snapshopSubscription: any;
  constructor(
    public snapshotService: SnapshotService,
    public snapshotDataService: SnapshotDataService,
    public cognitoService: CognitoService,
    public geolocationService: GeolocationService,
    public geolocationDataService: GeolocationDataService,
    public infoService: InfoService,
    public infoDataService: InfoDataService,
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
    this.snapshotService.startQuery();
    this.snapshopSubscription = this.snapshotService.queryObservable.subscribe((value) => {
      this.snapshotDataService.setSnapshot(value);
    });
  }

  ngOnDestroy() {
    this.snapshopSubscription.unsubscribe();
    this.geolocationSub.unsubscribe();
    this.infoDataSub.unsubscribe();
  }
}
