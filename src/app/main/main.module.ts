import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MainComponent } from './main.component';
import { RouterModule } from '@angular/router';
import { AppsyncService } from '../aws-appsync/service/appsync.service';
import { SnapshotService } from '../aws-appsync/service/snapshot.service';
import { HistoryService } from '../aws-appsync/service/history.service';
import { QuotesComponent } from './quotes/quotes.component';
import { TymxQuoteComponent } from './tymx-quote/tymx-quote.component';
import { TymxTokenQuoteComponent } from './tymx-token-quote/tymx-token-quote.component';
import { MainNoticeComponent } from './main-notice/main-notice.component';
import { SportsInfoComponent } from './sports-info/sports-info.component';
import { AppInstallComponent } from './app-install/app-install.component';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { HttpClient, HttpClientModule } from "@angular/common/http";
import { TranslateModule, TranslateLoader } from "@ngx-translate/core";
import { RealTimeColorDirective } from '../directive/real-time-color.directive';
@NgModule({
  imports: [
    NgbModule.forRoot(),
    CommonModule,
    RouterModule,
    HttpClientModule,
    TranslateModule,
  ],
  providers: [
    AppsyncService,
    SnapshotService,
    HistoryService
  ],
  declarations: [RealTimeColorDirective, MainComponent, QuotesComponent, TymxQuoteComponent, TymxTokenQuoteComponent, MainNoticeComponent, SportsInfoComponent, AppInstallComponent]
})
export class MainModule { }
