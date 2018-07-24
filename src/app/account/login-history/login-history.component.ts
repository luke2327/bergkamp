import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-login-history',
  templateUrl: './login-history.component.html',
  styleUrls: ['./login-history.component.sass']
})

//정해진게 없으므로 일단은 sample 데이터만 끼워둔다.
export class LoginHistoryComponent implements OnInit {

  viewModels: any;
  constructor() { }

  ngOnInit() {
    this.viewModels = [];
    for(let i=0; i<10; i++) {
      let viewModel = new ViewModel();
      viewModel.makeSample();
      this.viewModels.push(viewModel);
    }
  }

}
export class ViewModel {
  date: string;
  type: string;
  ip: string;

  constructor() {
    this.date = "";
    this.type = "";
    this.ip = "";
  }
  makeSample() {
    this.date = "2018.06.25 15:23:40";
    this.type = "Web";
    this.ip = "211.52.63.154";
  }
}
