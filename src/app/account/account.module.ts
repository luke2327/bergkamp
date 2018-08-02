import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { AccountComponent } from './account.component';
import { AccountInfoComponent } from './account-info/account-info.component';
import { AuthLevelComponent } from './auth-level/auth-level.component';
import { NotiSettingComponent } from './noti-setting/noti-setting.component';
import { LoginHistoryComponent } from './login-history/login-history.component';
import { RouterModule } from '@angular/router';
import { QRCodeModule } from 'angular2-qrcode';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { BrowserModule } from '@angular/platform-browser';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { CdkTableModule } from '@angular/cdk/table';
import { TranslateModule, TranslateLoader } from "@ngx-translate/core";
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
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
import { GAuthComponent } from './g-auth/g-auth.component';
import { SAuthComponent } from './s-auth/s-auth.component';
import { CancelGAuthComponent } from './cancel-g-auth/cancel-g-auth.component';
import { CancelSAuthComponent } from './cancel-s-auth/cancel-s-auth.component';
import { CancelCommonAuthComponent } from './cancel-common-auth/cancel-common-auth.component';
@NgModule({
  imports: [
    RouterModule,
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
    MatSlideToggleModule,
    CdkTableModule,
    DirectiveModule,
    QRCodeModule,
    NgbModule.forRoot(),
  ],
  declarations: [AccountComponent, AccountInfoComponent, AuthLevelComponent, NotiSettingComponent, LoginHistoryComponent, GAuthComponent, SAuthComponent, CancelGAuthComponent, CancelSAuthComponent, CancelCommonAuthComponent]
})
export class AccountModule { }
