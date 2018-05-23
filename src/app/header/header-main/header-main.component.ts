import { Component, OnInit } from '@angular/core';
import { TranslateService } from '@ngx-translate/core';
@Component({
  selector: 'app-header-main',
  templateUrl: './header-main.component.html',
  styleUrls: ['./header-main.component.css']
})
export class HeaderMainComponent implements OnInit {

  private langCodeObj = new Map().set("en", "English").set("ko", "한국어");
  constructor(private translate: TranslateService) { }

  ngOnInit() {
    
  }

}
