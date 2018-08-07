import { Component, OnInit, OnDestroy } from '@angular/core';
import { GeolocationService } from '../rest-api/service/geolocation.service';
import { GeolocationDataService } from '../rest-api/service/geolocation-data.service';
import { InfoService } from '../rest-api/service/info.service';
import { InfoDataService } from '../rest-api/service/info-data.service';
import { UserLoginService } from "../aws-appsync/service/user-login.service";
import { CognitoCallback } from '../aws-appsync/service/cognito.service';
import { CommonComponent } from "../common/common.component";
import { CompStateService } from '../service/comp-state.service';

@Component({
  selector: 'app-account',
  templateUrl: './account.component.html',
  styleUrls: ['./account.component.sass']
})
export class AccountComponent extends CommonComponent implements OnInit, OnDestroy {

  constructor(
    public geolocationService: GeolocationService,
    public geolocationDataService: GeolocationDataService,
    public infoService: InfoService,
    public infoDataService: InfoDataService,
    public userLoginService: UserLoginService,
    public compStateService: CompStateService
  ) {
    super(geolocationService, geolocationDataService,
          infoService, infoDataService,
          userLoginService, compStateService);
  }

  ngOnDestroy() {
    this.geolocationSub.unsubscribe();
    this.infoDataSub.unsubscribe();
  }

}
