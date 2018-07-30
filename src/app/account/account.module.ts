import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { AccountComponent } from './account.component';
import { AccountInfoComponent } from './account-info/account-info.component';
import { AuthLevelComponent } from './auth-level/auth-level.component';
import { NotiSettingComponent } from './noti-setting/noti-setting.component';
import { LoginHistoryComponent } from './login-history/login-history.component';
import { RouterModule } from '@angular/router';

import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { BrowserModule } from '@angular/platform-browser';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { CdkTableModule } from '@angular/cdk/table';
import { TranslateModule, TranslateLoader } from "@ngx-translate/core";
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
  ],
  declarations: [AccountComponent, AccountInfoComponent, AuthLevelComponent, NotiSettingComponent, LoginHistoryComponent]
})
export class AccountModule { }
