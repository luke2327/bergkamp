import { Component, OnInit } from '@angular/core';
import { GeolocationService } from '../rest-api/service/geolocation.service';
import { GeolocationDataService } from '../rest-api/service/geolocation-data.service';
import { InfoService } from '../rest-api/service/info.service';
import { InfoDataService } from '../rest-api/service/info-data.service';
import { UserLoginService } from "../aws-appsync/service/user-login.service";
import { CognitoCallback } from '../aws-appsync/service/cognito.service';
import { setLang, getLang, setCountry, getCountry } from '../app.util';
@Component({
  selector: 'app-common',
  templateUrl: './common.component.html',
  styleUrls: ['./common.component.sass']
})
//app 상태에 따른 호출을 조정한다.
export class CommonComponent implements OnInit {

  constructor(
    public geolocationService: GeolocationService,
    public geolocationDataService: GeolocationDataService,
    public infoService: InfoService,
    public infoDataService: InfoDataService,
    public userLoginService: UserLoginService
  ) {
    this.geolocationService.getGeoLocation();
    this.geolocationDataService.getGeolocationObservable.subscribe(data => {
      console.log(data);

      localStorage.setItem('geoloc', JSON.stringify(data));
      this.infoService.getInfoAll(getLang()+"-"+data.country.code);
    });
    this.infoDataService.getInfoAllObservable.subscribe(data => {
      //일단 localstorage에 저장해두고쓰자..
      //TODO 추후 session관리를 하게되면 sessionstorage로 변경하면된다.
      localStorage.setItem('info', JSON.stringify(data.body));
      // console.log(JSON.parse(localStorage.getItem('info')).body.pairs);
      this.userLoginService.isAuthenticatedLevel(new AuthLevelCallback(this));
    });
  }

  ngOnInit() {
  }

  startComponent() {

  }
  startComponentErr() {

  }
}
export class AuthLevelCallback implements CognitoCallback {
  component: CommonComponent;
  constructor(component: CommonComponent) {
    this.component = component;
  }

  cognitoCallback(message: string, result: any): void {
    if(result == 0) {
      //로그인 안됨
      this.component.userLoginService.autenticateGuest(new GuestLoginCallback(this.component));
    } else {
      this.component.startComponent();
    }
    this.component.userLoginService.loginSub(result>1);
  }
}

export class GuestLoginCallback implements CognitoCallback {
  component: CommonComponent;
  constructor(component: CommonComponent) {
    this.component = component;
  }

  cognitoCallback(message: string, result: any): void {
    if(result == null) {
      //게스트 로긴 실패
      this.component.startComponentErr();
    } else {
      this.component.startComponent();
    }
  }
}
