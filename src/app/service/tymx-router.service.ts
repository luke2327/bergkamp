import { Injectable } from '@angular/core';
import { Router, RouterEvent, NavigationEnd } from '@angular/router';
//로그인시 이전페이지가 뭐였는지 찾기가 어려우므로
//이곳에서 정보를 저장해두고 쓰자
@Injectable()
export class TymxRouterService {

  private previousUrl: string = '/';
  private currentUrl: string = '/';

  constructor(private router : Router) {
    this.currentUrl = this.router.url;
    console.log(this.router.url);
    router.events.subscribe(event => {
      if (event instanceof NavigationEnd) {
        console.log(this.currentUrl);

        this.previousUrl = this.currentUrl;
        if(!(event.url.includes('login')||(event.url.includes('signup'))))
          this.currentUrl = event.url;
      };
    });
  }

  public getPreviousUrl(): string {
    return this.previousUrl;
  }
}
