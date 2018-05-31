import { Component, OnInit } from '@angular/core';
import { TranslateService } from '@ngx-translate/core';
import { setLang, getLang } from '../../app.util';
import { Router } from "@angular/router";
@Component({
  selector: 'app-header-main',
  templateUrl: './header-main.component.html',
  styleUrls: ['./header-main.component.css']
})
export class HeaderMainComponent implements OnInit {

  private langCodeObj = new Map().set("en", "English").set("ko", "한국어");
  constructor(private translate: TranslateService, private router: Router) {

  }

  ngOnInit() {

  }

  setLanguage(lang: string): void {
    if(getLang() == lang){

    }else{
      setLang(lang);
      this.translate.use(lang);
      this.router.navigate(["/"]);
    }

  }
}
