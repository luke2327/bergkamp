import { Component, OnInit, OnDestroy } from '@angular/core';
import { WalletService } from '../rest-api/service/wallet.service';
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
  selector: 'app-wallet-transaction',
  templateUrl: './wallet-transaction.component.html',
  styleUrls: ['./wallet-transaction.component.sass']
})
export class WalletTransactionComponent extends CommonComponent implements OnInit, OnDestroy {
  subscribeId: any;
  type: any;
  selectedTab: number;
  constructor(private walletService: WalletService,
    private route: ActivatedRoute,
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
    this.selectedTab = 0;
  }
  ngOnDestroy() {
    this.geolocationSub.unsubscribe();
    this.infoDataSub.unsubscribe();
  }
  startComponent() {
    this.walletService.getBankStatementCrypto('all');
    this.subscribeId = this.route.params.subscribe(params => {
      if(params!=null && params['id']!=null) {
        this.type = params['id'];
        if(this.type=='withdrawal')
          this.selectedTab = 1;
      }

    });
  }
  startComponentErr() {}
}
