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
@NgModule({
  imports: [
    CommonModule,
    RouterModule,
    QRCodeModule,
    ClipboardModule,
    MomentTimezoneModule,
    MomentModule,
    FormsModule,
    DirectiveModule
  ],
  declarations: [WalletDepositComponent, DepositAddressComponent, DepositNoteComponent, DepositHistoryComponent]
})
export class WalletDepositModule { }
