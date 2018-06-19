import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { TradeComponent } from './trade.component';
import { ChartComponent } from './chart/chart.component';
import { TranslateModule, TranslateLoader } from "@ngx-translate/core";
import { PairInfoComponent } from './pair-info/pair-info.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { BrowserModule } from '@angular/platform-browser';
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
import { CoinInfoComponent } from './coin-info/coin-info.component';
import { DirectiveModule } from '../directive/directive.module';
import { BidAskTableComponent } from './bid-ask-table/bid-ask-table.component';
import { TradeHistoryComponent } from './trade-history/trade-history.component';
import { TradingComponent } from './trading/trading.component';
import { CommonOrderComponent } from './trading/common-order/common-order.component';
import { BuyLimitOrderComponent } from './trading/buy-limit-order/buy-limit-order.component';
import { SellLimitOrderComponent } from './trading/sell-limit-order/sell-limit-order.component';
import { SellMarketOrderComponent } from './trading/sell-market-order/sell-market-order.component';
import { BuyMarketOrderComponent } from './trading/buy-market-order/buy-market-order.component';
@NgModule({
  imports: [
    CommonModule,
    BrowserAnimationsModule,
    TranslateModule,
    MatCardModule,
    MatTabsModule,
    MatDividerModule,
    BrowserModule,
    FormsModule,
    ReactiveFormsModule,
    MatCheckboxModule,
    MatTableModule,
    MatSortModule,
    CdkTableModule,
    DirectiveModule
  ],
  declarations: [
    TradeComponent,
    ChartComponent,
    PairInfoComponent,
    CoinInfoComponent,
    BidAskTableComponent,
    TradeHistoryComponent,
    TradingComponent,
    CommonOrderComponent,
    BuyLimitOrderComponent,
    SellLimitOrderComponent,
    SellMarketOrderComponent,
    BuyMarketOrderComponent
  ]
})
export class TradeModule { }
