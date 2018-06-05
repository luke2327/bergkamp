import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { HttpClient, HttpClientModule } from "@angular/common/http";
import { HttpModule } from '@angular/http';
import { AppComponent } from './app.component';
// 외부 모듈 선언
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { TranslateModule, TranslateLoader } from "@ngx-translate/core";
import { TranslateHttpLoader } from '@ngx-translate/http-loader';
//커스텀 모듈 선언
import { FooterModule } from './footer/footer.module';
import { HeaderModule } from './header/header.module';
import { MainModule } from './main/main.module';
import { TradeModule } from './trade/trade.module';
//커스텀 컴포넌트 선언
import { RealTimeColorDirective } from './directive/real-time-color.directive';
import { MainComponent } from './main/main.component';
import { TradeComponent } from './trade/trade.component';
//언어변경 function loader
//https://github.com/ngx-translate 참고
export function HttpLoaderFactory(http: HttpClient) {
  return new TranslateHttpLoader(http);
}

//라우팅 설정
const routes: Routes = [
  {path: '', component: MainComponent},
  {path: 'trade/:id', component: TradeComponent}
];

@NgModule({
  declarations: [
    AppComponent,
  ],
  imports: [
    NgbModule.forRoot(),
    BrowserModule,
    RouterModule.forRoot(routes),
    HttpClientModule,
    TranslateModule.forRoot({
      loader: {
        provide: TranslateLoader,
        useFactory: HttpLoaderFactory,
        deps: [HttpClient]
      }
    }),
    FooterModule,
    HeaderModule,
    MainModule,
    TradeModule,
    HttpModule
  ],
  exports: [
    HttpClientModule,
    TranslateModule,
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
