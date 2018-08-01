import { Component, OnInit } from '@angular/core';
import { TranslateService } from '@ngx-translate/core';
import { Router } from "@angular/router";
import { TymxRouterService } from "../../service/tymx-router.service";
import { CancelCommonAuthComponent, ViewModel } from "../cancel-common-auth/cancel-common-auth.component";

@Component({
  selector: 'app-cancel-g-auth',
  templateUrl: '../cancel-common-auth/cancel-common-auth.component.html',
  styleUrls: ['../cancel-common-auth/cancel-common-auth.component.sass']
})
export class CancelGAuthComponent extends CancelCommonAuthComponent implements OnInit {

  constructor(public translateService: TranslateService,
              public router: Router,
              public tymxRouterService: TymxRouterService) {
    super(translateService, router, tymxRouterService);
  }

  ngOnInit() {
  }

  gAuth() {
  }

  sAuth() {}
}
