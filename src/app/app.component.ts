import { Component, Inject, OnInit } from '@angular/core';
import { TranslateService, LangChangeEvent } from '@ngx-translate/core';
import { setLang, getLang, setCountry, getCountry } from './app.util';
import { DOCUMENT } from '@angular/common';
import { GeolocationService } from './rest-api/service/geolocation.service';
import { GeolocationDataService } from './rest-api/service/geolocation-data.service';
import { InfoService } from './rest-api/service/info.service';
import { InfoDataService } from './rest-api/service/info-data.service';
@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.sass']
})
export class AppComponent implements OnInit {
  title = 'app';
  constructor(private translate: TranslateService,
    private geolocationService: GeolocationService,
    private geolocationDataService: GeolocationDataService,
    private infoService: InfoService,
    private infoDataService: InfoDataService,
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
    this.geolocationService.getGeoLocation();
    this.geolocationDataService.getGeolocationObservable.subscribe(data => {
      setCountry(data.country.code);
      this.infoService.getInfoAll(getLang()+"-"+getCountry());
      localStorage.setItem('geoloc', JSON.stringify(data));
    });
    this.infoDataService.getInfoAllObservable.subscribe(data => {
      //일단 localstorage에 저장해두고쓰자..
      //TODO 추후 session관리를 하게되면 sessionstorage로 변경하면된다.
      localStorage.setItem('info', JSON.stringify(data.body));
      // console.log(JSON.parse(localStorage.getItem('info')).body.pairs);
    });
  }
}
