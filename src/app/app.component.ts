import { Component, Inject } from '@angular/core';
import { TranslateService, LangChangeEvent } from '@ngx-translate/core';
import { setLang, getLang } from './app.util';
import { DOCUMENT } from '@angular/common';
@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  title = 'app';
  constructor(private translate: TranslateService, @Inject(DOCUMENT) private document: any) {
    console.log(document.documentElement.lang='ko');
    translate.addLangs(["en", "ko"]);
    translate.setDefaultLang('en');
    //브라우저 언어를 보고 default 언어를 설정하도록 함
    let browserLang = translate.getBrowserLang();
    translate.use(browserLang.match(/en|ko/) ? browserLang : 'en');
    setLang(browserLang.match(/en|ko/) ? browserLang : 'en');
    console.log(DOCUMENT);
    translate.onLangChange.subscribe((event: LangChangeEvent) => {
      //head의 언어설정을 바꿔준다.
      document.documentElement.lang = getLang();
    });
  }
}
