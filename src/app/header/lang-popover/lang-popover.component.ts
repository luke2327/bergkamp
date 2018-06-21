import { Component, OnInit } from '@angular/core';
import { TranslateService } from '@ngx-translate/core';
import { SupportedLang } from '../../app.const';
import { LangToggleService } from '../../service/lang-toggle.service';
import { setLang } from '../../app.util';
@Component({
  selector: 'app-lang-popover',
  templateUrl: './lang-popover.component.html',
  styleUrls: ['./lang-popover.component.sass']
})
/* 언어선택 팝업 */
export class LangPopoverComponent implements OnInit {
  supportedLang:any = SupportedLang;

  constructor(private translate: TranslateService,
    private langToggleService:LangToggleService) {


  }

  ngOnInit() {
  }

  setLanguage(lang: string): void {
    setLang(lang);
    this.translate.use(lang);
    this.langToggleService.setOpen(false);
  }
}
