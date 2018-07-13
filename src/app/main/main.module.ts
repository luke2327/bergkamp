import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MainComponent } from './main.component';
import { RouterModule } from '@angular/router';
import { AppsyncService } from '../aws-appsync/service/appsync.service';
import { SnapshotService } from '../aws-appsync/service/snapshot.service';
import { SnapshotDataService } from '../aws-appsync/service/snapshot-data.service';
import { HistoryService } from '../aws-appsync/service/history.service';
import { SampleNoticeService } from '../rest-api/service/sample-notice.service';
import { GeolocationService } from '../rest-api/service/geolocation.service';
import { GeolocationDataService } from '../rest-api/service/geolocation-data.service';
import { OrderService } from '../rest-api/service/order.service';
import { OrderDataService } from '../rest-api/service/order-data.service';
import { FavoriteService } from '../rest-api/service/favorite.service';
import { FavoriteDataService } from '../rest-api/service/favorite-data.service';
import { InfoService } from '../rest-api/service/info.service';
import { InfoDataService } from '../rest-api/service/info-data.service';
import { QuotesComponent } from './quotes/quotes.component';
import { TymxQuoteComponent } from './tymx-quote/tymx-quote.component';
import { TymxTokenQuoteComponent } from './tymx-token-quote/tymx-token-quote.component';
import { MainNoticeComponent } from './main-notice/main-notice.component';
import { SportsInfoComponent } from './sports-info/sports-info.component';
import { AppInstallComponent } from './app-install/app-install.component';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { HttpClient, HttpClientModule } from "@angular/common/http";
import { TranslateModule, TranslateLoader } from "@ngx-translate/core";
import { DirectiveModule } from '../directive/directive.module';
import { NotiToggleService } from '../service/noti-toggle.service';
import { LangToggleService } from '../service/lang-toggle.service';
import { SampleLoginService } from '../service/sample-login.service';
import { TradePageStateService } from '../service/trade-page-state.service';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { CdkTableModule } from '@angular/cdk/table';
import {
  MatAutocompleteModule,
  MatButtonModule,
  MatButtonToggleModule,
  MatCardModule,
  MatCheckboxModule,
  MatChipsModule,
  MatDatepickerModule,
  MatDialogModule,
  MatDividerModule,
  MatExpansionModule,
  MatGridListModule,
  MatIconModule,
  MatInputModule,
  MatListModule,
  MatMenuModule,
  MatNativeDateModule,
  MatPaginatorModule,
  MatProgressBarModule,
  MatProgressSpinnerModule,
  MatRadioModule,
  MatRippleModule,
  MatSelectModule,
  MatSidenavModule,
  MatSliderModule,
  MatSlideToggleModule,
  MatSnackBarModule,
  MatSortModule,
  MatStepperModule,
  MatTableModule,
  MatTabsModule,
  MatToolbarModule,
  MatTooltipModule,
} from '@angular/material';
@NgModule({
  imports: [
    NgbModule.forRoot(),
    CommonModule,
    RouterModule,
    HttpClientModule,
    TranslateModule,
    DirectiveModule,
    MatCardModule,
    MatTabsModule
  ],
  providers: [
    AppsyncService,
    SnapshotService,
    HistoryService,
    SampleNoticeService,
    GeolocationService,
    GeolocationDataService,
    SnapshotDataService,
    NotiToggleService,
    LangToggleService,
    OrderService,
    SampleLoginService,
    OrderDataService,
    TradePageStateService,
    FavoriteService,
    FavoriteDataService,
    InfoService,
    InfoDataService
  ],
  exports: [],
  declarations: [MainComponent, QuotesComponent, TymxQuoteComponent, TymxTokenQuoteComponent, MainNoticeComponent, SportsInfoComponent, AppInstallComponent]
})
export class MainModule { }
