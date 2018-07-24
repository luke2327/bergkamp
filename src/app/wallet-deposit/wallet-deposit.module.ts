import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { WalletDepositComponent } from './wallet-deposit.component';
import { DepositAddressComponent } from './deposit-address/deposit-address.component';
import { DepositNoteComponent } from './deposit-note/deposit-note.component';
import { DepositHistoryComponent } from './deposit-history/deposit-history.component';
import { QRCodeModule } from 'angular2-qrcode';
import { ClipboardModule } from 'ngx-clipboard';
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
    CommonModule,
    RouterModule,
    QRCodeModule,
    ClipboardModule,
    MomentTimezoneModule,
    MomentModule,
    FormsModule,
    DirectiveModule,
    MatCardModule,
  ],
  declarations: [WalletDepositComponent, DepositAddressComponent, DepositNoteComponent, DepositHistoryComponent]
})
export class WalletDepositModule { }
