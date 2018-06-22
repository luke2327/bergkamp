import { Component, OnInit } from '@angular/core';
import { TranslateService } from '@ngx-translate/core';
import { setLang, getLang } from '../../app.util';
import { Router } from "@angular/router";
import { NotiToggleService } from '../../service/noti-toggle.service';
@Component({
  selector: 'app-header-main',
  templateUrl: './header-main.component.html',
  styleUrls: ['./header-main.component.css']
})
export class HeaderMainComponent implements OnInit {
  //TODO 슬슬 이 멍청한 변수선언 코드를 고칠때가 온듯..
  private langCodeObj = new Map().set("en", "English").set("ko", "한국어");
  isNoti: boolean = false;
  constructor(private translate: TranslateService,
      private router: Router,
      private notiToggleService:NotiToggleService) {
  }

  ngOnInit() {
    this.isNoti = false;
    this.notiToggleService.setOpen(this.isNoti);
    this.notiToggleService.obervable.subscribe(data => {
      this.isNoti = data;
    });
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
  }
}
