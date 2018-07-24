import { Component, OnInit, AfterViewInit, OnDestroy } from '@angular/core';

@Component({
  selector: 'app-auth-level',
  templateUrl: './auth-level.component.html',
  styleUrls: ['./auth-level.component.sass']
})
//인증 레벨
//일단 나와있는건 없으므로 데이터를 샘플로 대충 구현하자.
export class AuthLevelComponent implements OnInit, AfterViewInit, OnDestroy {

  viewModel: ViewModel;

  constructor() { }

  ngOnInit() {
    this.viewModel = new ViewModel();
    this.viewModel.makeSample();
  }

  ngAfterViewInit() {

  }

  ngOnDestroy() {}

}
export class ViewModel {
  level: number;
  levelName: string;
  levelMax: number;
  isVarifiedEmail: boolean;
  isVarifiedOtp: boolean;
  isVarifiedSms: boolean;
  verifiedDocument: number;//0: none, 1:verifying, 2: verified
  verifiedContact: number;
  constructor() {
    this.level = 0;
    this.levelName = "";
    this.levelMax = 0;
    this.isVarifiedOtp = false;
    this.isVarifiedSms = false;
    this.verifiedDocument = 0;
    this.verifiedContact = 0;
  }

  makeSample() {
    this.level = 1;
    this.levelName = "YouthTeam";
    this.levelMax = 5;
    this.isVarifiedOtp = false;
    this.isVarifiedSms = false;
    this.verifiedDocument = 0;
    this.verifiedContact = 0;
  }
}
