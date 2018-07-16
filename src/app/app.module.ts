import { BrowserModule } from '@angular/platform-browser';
import { CdkTableModule } from '@angular/cdk/table';
import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { HttpClient, HttpClientModule } from "@angular/common/http";
import { HttpModule } from '@angular/http';
import { AppComponent } from './app.component';
// 외부 모듈 선언
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { TranslateModule, TranslateLoader } from "@ngx-translate/core";
import { TranslateHttpLoader } from '@ngx-translate/http-loader';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
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
import { platformBrowserDynamic } from '@angular/platform-browser-dynamic';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
//커스텀 모듈 선언
import { FooterModule } from './footer/footer.module';
import { HeaderModule } from './header/header.module';
import { MainModule } from './main/main.module';
import { TradeModule } from './trade/trade.module';
import { DirectiveModule } from './directive/directive.module';
import { WalletModule } from './wallet/wallet.module';
import { WalletDepositModule } from './wallet-deposit/wallet-deposit.module';
import { WalletWithdrawModule } from './wallet-withdraw/wallet-withdraw.module';
//커스텀 컴포넌트 선언
import { MainComponent } from './main/main.component';
import { TradeFavoriteButtonDirective } from './directive/trade-favorite-button.directive';
import { TradeComponent } from './trade/trade.component';
import { WalletComponent } from './wallet/wallet.component';
import { WalletDepositComponent } from './wallet-deposit/wallet-deposit.component';
import { WalletWithdrawComponent } from './wallet-withdraw/wallet-withdraw.component';
//언어변경 function loader
//https://github.com/ngx-translate 참고
export function HttpLoaderFactory(http: HttpClient) {
  return new TranslateHttpLoader(http);
}

//라우팅 설정
const routes: Routes = [
  {path: '', component: MainComponent},
  {path: 'trade/:id', component: TradeComponent},
  {path: 'wallet', component: WalletComponent},
  {path: 'wallet/deposit/:id', component: WalletDepositComponent},
  {path: 'wallet/withdrawal/:id', component: WalletWithdrawComponent}
];

@NgModule({
  declarations: [
    AppComponent,
  ],
  imports: [
    NgbModule.forRoot(),
    BrowserModule,
    RouterModule.forRoot(routes),
    BrowserAnimationsModule,
    FormsModule,
    MatNativeDateModule,
    HttpClientModule,
    ReactiveFormsModule,
    TranslateModule.forRoot({
      loader: {
        provide: TranslateLoader,
        useFactory: HttpLoaderFactory,
        deps: [HttpClient]
      }
    }),
    FooterModule,
    HeaderModule,
    MainModule,
    TradeModule,
    HttpModule,
    DirectiveModule,
    WalletModule,
    WalletDepositModule,
    WalletWithdrawModule
  ],
  exports: [
    HttpClientModule,
    TranslateModule,
    CdkTableModule,
    MatAutocompleteModule,
    MatButtonModule,
    MatButtonToggleModule,
    MatCardModule,
    MatCheckboxModule,
    MatChipsModule,
    MatStepperModule,
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
    MatTableModule,
    MatTabsModule,
    MatToolbarModule,
    MatTooltipModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
