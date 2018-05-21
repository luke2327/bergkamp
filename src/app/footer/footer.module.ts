import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FooterComponent } from './footer.component';
import { HttpClient, HttpClientModule } from "@angular/common/http";
import { TranslateModule, TranslateLoader } from "@ngx-translate/core";
import { FooterMainComponent } from './footer-main/footer-main.component';
import { HttpLoaderFactory } from '../app.module';


@NgModule({
  imports: [
    CommonModule,
    HttpClientModule,
    TranslateModule
  ],
  exports: [
    FooterComponent
  ],
  declarations: [FooterComponent, FooterMainComponent]
})
export class FooterModule { }
