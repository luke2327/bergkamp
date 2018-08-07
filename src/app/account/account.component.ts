import { Component, OnInit } from '@angular/core';
import { GeolocationService } from '../rest-api/service/geolocation.service';
import { GeolocationDataService } from '../rest-api/service/geolocation-data.service';
import { InfoService } from '../rest-api/service/info.service';
import { InfoDataService } from '../rest-api/service/info-data.service';
import { UserLoginService } from "../aws-appsync/service/user-login.service";
import { CognitoCallback } from '../aws-appsync/service/cognito.service';
import { CommonComponent } from "../common/common.component";
@Component({
  selector: 'app-account',
  templateUrl: './account.component.html',
  styleUrls: ['./account.component.sass']
})
export class AccountComponent extends CommonComponent implements OnInit {

  constructor(
    public geolocationService: GeolocationService,
    public geolocationDataService: GeolocationDataService,
    public infoService: InfoService,
    public infoDataService: InfoDataService,
    public userLoginService: UserLoginService
  ) {
    super(geolocationService, geolocationDataService, infoService, infoDataService, userLoginService);
  }

  ngOnInit() {
  }

}
