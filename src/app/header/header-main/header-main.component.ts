import { Component, OnInit, AfterViewInit } from '@angular/core';
import { TranslateService } from '@ngx-translate/core';
import { setLang, getLang, getSupportedLangMap } from '../../app.util';
import { Router } from "@angular/router";
import { NotiToggleService } from '../../service/noti-toggle.service';
import { SampleLoginService } from '../../service/sample-login.service';
import { LangToggleService } from '../../service/lang-toggle.service';
@Component({
  selector: 'app-header-main',
  templateUrl: './header-main.component.html',
  styleUrls: ['./header-main.component.sass']
})
export class HeaderMainComponent implements OnInit, AfterViewInit {
  //TODO 슬슬 이 멍청한 변수선언 코드를 고칠때가 온듯..
  private langCodeObj: any;
  isNoti: boolean = false;
  isLang: boolean = false;
  isLogin: boolean = false;
  constructor(private translate: TranslateService,
      private router: Router,
      private notiToggleService:NotiToggleService,
      private langToggleService:LangToggleService,
      private sampleLoginService:SampleLoginService) {
    this.langCodeObj = getSupportedLangMap();
  }

  ngOnInit() {

    this.isNoti = false;
    this.notiToggleService.setOpen(this.isNoti);
    this.langToggleService.setOpen(this.isLang);
    this.notiToggleService.observable.subscribe(data => {
      this.isNoti = data;
    });
    this.sampleLoginService.observable.subscribe(data => {
      this.isLogin = data;
    });
    this.langToggleService.observable.subscribe(data => {
      this.isLang = data;
    });
  }
  ngAfterViewInit(){

  }
  setLanguage(lang: string): void {
    if(getLang() == lang){
      //TODO 만약 언어가 같은걸 선택했다면 무언가 설정값을 바꿔줄게 있을지
      // 혹은 리프레시할게 있을지 찾아보자.
    }else{
      setLang(lang);
      this.translate.use(lang);
      this.router.navigate(["/"]);
    }
  }
  //noti의 open/close 조절해준다.
  notiToggle(): void {
    this.notiToggleService.toggle();
    this.langToggleService.setOpen(false);
  }

  //langpopover의 open/close
  langToggle(): void {
    this.langToggleService.toggle();
    this.notiToggleService.setOpen(false);
  }
}
