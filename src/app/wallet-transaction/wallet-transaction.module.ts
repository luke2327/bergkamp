import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';
import { CommonModule } from '@angular/common';
import { TranslateModule, TranslateLoader } from "@ngx-translate/core";
import { CdkTableModule } from '@angular/cdk/table';
import { MomentTimezoneModule } from 'angular-moment-timezone';
import { MomentModule } from 'angular2-moment';
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
import { DirectiveModule } from '../directive/directive.module';
import { WalletTransactionComponent } from './wallet-transaction.component';
import { CommonHistoryComponent } from './common-history/common-history.component';
import { DepositHistoryComponent } from './deposit-history/deposit-history.component';
import { WithdrawHistoryComponent } from './withdraw-history/withdraw-history.component';

@NgModule({
  imports: [
    RouterModule,
    CommonModule,
    TranslateModule,
    MatCardModule,
    MatTabsModule,
    MatMenuModule,
    MatDividerModule,
    MatCheckboxModule,
    MatTableModule,
    MatSortModule,
    CdkTableModule,
    MomentTimezoneModule,
    MomentModule,
    DirectiveModule
  ],
  declarations: [WalletTransactionComponent, CommonHistoryComponent, DepositHistoryComponent, WithdrawHistoryComponent]
})
export class WalletTransactionModule { }
