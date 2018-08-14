import { Component, OnInit } from '@angular/core';
import { TranslateService } from '@ngx-translate/core';
import { SupportedLang } from '../../app.const';
import { LangToggleService } from '../../service/lang-toggle.service';
import { setLang } from '../../app.util';
import { CommonSubComponent } from '../../common-sub/common-sub.component';
import { CompStateService } from '../../service/comp-state.service';
@Component({
  selector: 'app-lang-popover',
  templateUrl: './lang-popover.component.html',
  styleUrls: ['./lang-popover.component.sass']
})
/* 언어선택 팝업 */
export class LangPopoverComponent extends CommonSubComponent implements OnInit {
  supportedLang:any = SupportedLang;

  constructor(
    private translate: TranslateService,
    private langToggleService:LangToggleService,
    public compStateService: CompStateService
  ) {

    super(compStateService);
  }

  ngOnInit() {
  }
  startComponent() {
  }
  startComponentErr() {

  }
  setLanguage(lang: string): void {
    setLang(lang);
    this.translate.use(lang);
    this.langToggleService.setOpen(false);
    this.compStateService.restartApp();
  }
}
