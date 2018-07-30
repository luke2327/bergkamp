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
import { QRCodeModule } from 'angular2-qrcode';
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
import { MomentTimezoneModule } from 'angular-moment-timezone';
import { MomentModule } from 'angular2-moment';
//커스텀 모듈 선언
import { FooterModule } from './footer/footer.module';
import { HeaderModule } from './header/header.module';
import { MainModule } from './main/main.module';
import { TradeModule } from './trade/trade.module';
import { DirectiveModule } from './directive/directive.module';
import { AuthModule } from './auth/auth.module';
import { WalletModule } from './wallet/wallet.module';
import { WalletDepositModule } from './wallet-deposit/wallet-deposit.module';
import { WalletWithdrawModule } from './wallet-withdraw/wallet-withdraw.module';
import { WalletTransactionModule } from './wallet-transaction/wallet-transaction.module';
import { AccountModule } from './account/account.module';
//커스텀 컴포넌트 선언
import { MainComponent } from './main/main.component';
import { TradeComponent } from './trade/trade.component';
import { WalletComponent } from './wallet/wallet.component';
import { WalletDepositComponent } from './wallet-deposit/wallet-deposit.component';
import { WalletWithdrawComponent } from './wallet-withdraw/wallet-withdraw.component';
import { WalletTransactionComponent } from './wallet-transaction/wallet-transaction.component';
import { LoginComponent } from './auth/login/login.component';
import { Auth2faComponent } from './auth/auth-2fa/auth-2fa.component';
import { SignupComponent } from './auth/signup/signup.component';
import { AccountComponent } from './account/account.component';

import { TymxRouterService } from './service/tymx-router.service';
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
  {path: 'wallet/withdrawal/:id', component: WalletWithdrawComponent},
  {path: 'wallet/transaction', component: WalletTransactionComponent},
  {path: 'wallet/transaction/:id', component: WalletTransactionComponent},
  {path: 'login', component: LoginComponent},
  {path: 'login/auth', component: Auth2faComponent},
  {path: 'signup', component: SignupComponent},
  {path: 'account', component: AccountComponent}
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
    WalletWithdrawModule,
    WalletTransactionModule,
    MomentTimezoneModule,
    MomentModule,
    AuthModule,
    QRCodeModule,
    AccountModule
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
  providers: [TymxRouterService],
  bootstrap: [AppComponent]
})
export class AppModule {
  constructor(private tymxRouterService: TymxRouterService) {

  }
}
