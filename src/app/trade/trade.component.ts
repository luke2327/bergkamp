import { Component, OnInit, OnDestroy } from '@angular/core';
import { SnapshotService } from '../aws-appsync/service/snapshot.service';
import { SnapshotDataService } from '../aws-appsync/service/snapshot-data.service';
import { NotiToggleService } from '../service/noti-toggle.service';
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
  selector: 'app-trade',
  templateUrl: './trade.component.html',
  styleUrls: ['./trade.component.sass']
})
export class TradeComponent extends CommonComponent implements OnInit, OnDestroy {
  snapshopSubscription: any;
  constructor(
    public snapshotService: SnapshotService,
    public snapshotDataService: SnapshotDataService,
    public notiToggleService:NotiToggleService,
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
          userLoginService, compStateService);
  }

  startComponent() {
    let mythis = this;
    this.cognitoService.getIdToken({
      callback() {

      },
      callbackWithParam(token: any) {
        //이전페이지에서 noti창이 열려있었다면 닫아준다.
        mythis.appsyncService.setClient(token);
        mythis.notiToggleService.setOpen(false);
        mythis.snapshotService.startObserver();
        mythis.snapshopSubscription = mythis.snapshotService.queryObservable.subscribe((value) => {
          mythis.snapshotDataService.setSnapshot(value);
        });
      }
    });
  }
  startComponentErr() {

  }
  ngOnDestroy() {
    this.snapshopSubscription.unsubscribe();
    this.geolocationSub.unsubscribe();
    this.infoDataSub.unsubscribe();
  }
}
