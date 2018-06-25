import { Component, Inject, OnInit } from '@angular/core';
import { TranslateService, LangChangeEvent } from '@ngx-translate/core';
import { setLang, getLang, setCountry } from './app.util';
import { DOCUMENT } from '@angular/common';
import { GeolocationService } from './rest-api/service/geolocation.service';
@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.sass']
})
export class AppComponent implements OnInit {
  title = 'app';
  constructor(private translate: TranslateService,
    private geolocationService: GeolocationService,
    @Inject(DOCUMENT) private document: any) {

    translate.addLangs(["en", "ko"]);
    translate.setDefaultLang('en');
    //브라우저 언어를 보고 default 언어를 설정하도록 함
    let browserLang = translate.getBrowserLang();
    translate.use(browserLang.match(/en|ko/) ? browserLang : 'en');
    setLang(browserLang.match(/en|ko/) ? browserLang : 'en');

    translate.onLangChange.subscribe((event: LangChangeEvent) => {
      //head의 언어설정을 바꿔준다.
      document.documentElement.lang = getLang();
    });

  }
  ngOnInit() {
    //geolocation api call을 통해 country 정보를 갖고있자.
    this.geolocationService.getGeoLocation().subscribe(data => {
      setCountry(data.country.code);
    });
  }
}
