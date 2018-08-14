import { Component, OnInit, OnDestroy } from '@angular/core';
import { GeolocationService } from '../rest-api/service/geolocation.service';
import { GeolocationDataService } from '../rest-api/service/geolocation-data.service';
import { InfoService } from '../rest-api/service/info.service';
import { InfoDataService } from '../rest-api/service/info-data.service';
import { UserLoginService } from "../aws-appsync/service/user-login.service";
import { CognitoCallback, CognitoService, LoggedInCallback, Callback } from '../aws-appsync/service/cognito.service';
import { CompStateService } from '../service/comp-state.service';
import { setLang, getLang, setCountry, getCountry } from '../app.util';
import { AppState } from '../app.const';
@Component({
  selector: 'app-common',
  templateUrl: './common.component.html',
  styleUrls: ['./common.component.sass']
})
//app 상태에 따른 호출을 조정한다.
//로그인정보가 필요한 페이지는 이 component를 상속받아사용한다.
//1. geolocation 정보 가져옴
//2. infodata 정보 가져옴
//3. 로그인은 했는가??
//4. 안했다면 guest 계정 로그인
//5. component 실행 단계로 넘겨줌
//6. 하위컴포넌트에 알려준다.
export class CommonComponent implements OnInit, OnDestroy {
  geolocationSub: any;
  infoDataSub: any;
  restartSub: any;
  token: any;
  constructor(
    public geolocationService: GeolocationService,
    public geolocationDataService: GeolocationDataService,
    public infoService: InfoService,
    public infoDataService: InfoDataService,
    public userLoginService: UserLoginService,
    public compStateService: CompStateService,
    public cognitoService: CognitoService
  ) {

  }

  ngOnInit() {
    this.init();
  }


  ngOnDestroy() {

  }
  getIdToken() {
    let mythis = this;
    this.cognitoService.getIdToken({
      callback() {

      },
      callbackWithParam(token: any) {
        mythis.token = token;
        mythis.compStateService.setToken(token);
        mythis.startComponent();
      }
    });
  }
  init() {
    this.geolocationService.getGeoLocation();
    this.geolocationSub = this.geolocationDataService.getGeolocationObservable.subscribe(data => {
      console.log(JSON.stringify(data));
      localStorage.setItem('geoloc', JSON.stringify(data));
      this.infoService.getInfoAll(getLang());
    });
    this.infoDataSub = this.infoDataService.getInfoAllObservable.subscribe(data => {
      //일단 localstorage에 저장해두고쓰자..
      //TODO 추후 session관리를 하게되면 sessionstorage로 변경하면된다.
      localStorage.setItem('info', JSON.stringify(data));
      // console.log(JSON.parse(localStorage.getItem('info')).body.pairs);
      this.userLoginService.isAuthenticatedLevel(new AuthLevelCallback(this));
    });
    this.restartSub = this.compStateService.observable.subscribe(data => {
      if(data == AppState.RestartApp) {
        this.init();
      }
    });
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
      this.component.getIdToken();
      this.component.compStateService.startApp();
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
      this.component.compStateService.startAppErr();
    } else {
      this.component.getIdToken();
      this.component.compStateService.startApp();
    }
  }
}
