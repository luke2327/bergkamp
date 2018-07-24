import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { WalletWithdrawComponent } from './wallet-withdraw.component';
import { WithdrawAddressComponent } from './withdraw-address/withdraw-address.component';
import { WithdrawNoteComponent } from './withdraw-note/withdraw-note.component';
import { WithdrawHistoryComponent } from './withdraw-history/withdraw-history.component';

import { MomentTimezoneModule } from 'angular-moment-timezone';
import { MomentModule } from 'angular2-moment';
import { DirectiveModule } from '../directive/directive.module';
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
    RouterModule,
    CommonModule,
    MomentTimezoneModule,
    MomentModule,
    FormsModule,
    DirectiveModule,
    MatCardModule,
  ],
  declarations: [WalletWithdrawComponent, WithdrawAddressComponent, WithdrawNoteComponent, WithdrawHistoryComponent]
})
export class WalletWithdrawModule { }
