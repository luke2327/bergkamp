import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-noti-setting',
  templateUrl: './noti-setting.component.html',
  styleUrls: ['./noti-setting.component.sass']
})
//정해진게 없으므로 일단 데이터만 샘플로 끼운다.
export class NotiSettingComponent implements OnInit {
  viewModel: ViewModel;
  constructor() { }

  ngOnInit() {
    this.viewModel = new ViewModel();
    this.viewModel.makeSample();
  }

}
export class ViewModel {
  isLoginEmail: boolean;
  isLoginSms: boolean;
  isTradeEmail: boolean;
  isTradeSms: boolean;
  isDepositEmail: boolean;
  isDepositSms: boolean;
  isWithdrawalEmail: boolean;
  isWithdrawalSms: boolean;

  constructor() {
    this.isLoginEmail = false;
    this.isLoginSms = false;
    this.isTradeEmail = false;
    this.isTradeSms = false;
    this.isDepositEmail = false;
    this.isDepositSms = false;
    this.isWithdrawalEmail = false;
    this.isWithdrawalSms = false;
  }

  makeSample() {
    this.isLoginEmail = true;
    this.isLoginSms = true;
    this.isTradeEmail = false;
    this.isTradeSms = true;
    this.isDepositEmail = true;
    this.isDepositSms = true;
    this.isWithdrawalEmail = true;
    this.isWithdrawalSms = false;
  }
}
