import { Component } from '@angular/core';
import { TranslateService } from '@ngx-translate/core';
@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  title = 'app';

  constructor(private translate: TranslateService) {
    translate.addLangs(["en", "ko"]);
    translate.setDefaultLang('en');
    //브라우저 언어를 보고 default 언어를 설정하도록 함
    let browserLang = translate.getBrowserLang();
    translate.use(browserLang.match(/en|ko/) ? browserLang : 'en');
  }
}
