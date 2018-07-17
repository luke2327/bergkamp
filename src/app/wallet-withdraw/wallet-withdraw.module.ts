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
@NgModule({
  imports: [
    RouterModule,
    CommonModule,
    MomentTimezoneModule,
    MomentModule,
    FormsModule,
    DirectiveModule
  ],
  declarations: [WalletWithdrawComponent, WithdrawAddressComponent, WithdrawNoteComponent, WithdrawHistoryComponent]
})
export class WalletWithdrawModule { }
