import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';
import { CommonModule } from '@angular/common';
import { WalletComponent } from './wallet.component';
import { TranslateModule, TranslateLoader } from "@ngx-translate/core";
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
import { DirectiveModule } from '../directive/directive.module';
import { WalletHeaderComponent } from './wallet-header/wallet-header.component';
import { WalletCryptoComponent } from './wallet-crypto/wallet-crypto.component';
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
    DirectiveModule
  ],
  declarations: [WalletComponent, WalletHeaderComponent, WalletCryptoComponent]
})
export class WalletModule { }
