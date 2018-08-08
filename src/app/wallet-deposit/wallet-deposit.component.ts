import { Component, OnInit, AfterViewInit, OnDestroy } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
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
  selector: 'app-wallet-deposit',
  templateUrl: './wallet-deposit.component.html',
  styleUrls: ['./wallet-deposit.component.sass']
})
export class WalletDepositComponent extends CommonComponent implements OnInit, AfterViewInit, OnDestroy {

  cryptoName: string;
  subscribeId: any;
  constructor(
    private route: ActivatedRoute,
    public geolocationService: GeolocationService,
    public geolocationDataService: GeolocationDataService,
    public infoService: InfoService,
    public infoDataService: InfoDataService,
    public userLoginService: UserLoginService,
    public appsyncService: AppsyncService,
    public compStateService: CompStateService,
    public cognitoService: CognitoService
  ) {
    super(geolocationService, geolocationDataService,
          infoService, infoDataService,
          userLoginService, compStateService,
          cognitoService);
  }


  ngAfterViewInit() {

  }
  ngOnDestroy() {
    this.geolocationSub.unsubscribe();
    this.infoDataSub.unsubscribe();
  }
  startComponent() {
    this.subscribeId = this.route.params.subscribe(params => {
      this.cryptoName = params['id'].toUpperCase();
    });
  }
  startComponentErr() {}
}
