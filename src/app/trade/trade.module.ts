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
import { TradeFavoriteButtonDirective } from '../directive/trade-favorite-button.directive';

@NgModule({
  imports: [
    CommonModule,
    BrowserAnimationsModule,
    TranslateModule,
    MatCardModule,
    MatTabsModule,
    BrowserModule,
    FormsModule,
    ReactiveFormsModule,
    MatCheckboxModule,
    MatTableModule,
    MatSortModule,
    CdkTableModule
  ],
  declarations: [
    TradeFavoriteButtonDirective,
    TradeComponent,
    ChartComponent,
    PairInfoComponent
  ]
})
export class TradeModule { }
