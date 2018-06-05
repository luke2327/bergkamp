import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { TradeComponent } from './trade.component';
import { ChartComponent } from './chart/chart.component';
import { TranslateModule, TranslateLoader } from "@ngx-translate/core";
@NgModule({
  imports: [
    CommonModule,
    TranslateModule
  ],
  declarations: [TradeComponent, ChartComponent]
})
export class TradeModule { }
