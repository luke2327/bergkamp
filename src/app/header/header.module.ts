import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { HeaderComponent } from './header.component';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { HeaderMainComponent } from './header-main/header-main.component';
import { HttpClient, HttpClientModule } from "@angular/common/http";
import { TranslateModule, TranslateLoader } from "@ngx-translate/core";
@NgModule({
  imports: [
    NgbModule,
    CommonModule,
    HttpClientModule,
    TranslateModule
  ],
  exports: [
    HeaderComponent
  ],
  declarations: [HeaderComponent, HeaderMainComponent]
})
export class HeaderModule { }
