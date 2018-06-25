import { Component, OnInit } from '@angular/core';
@Component({
  selector: 'app-footer-main',
  templateUrl: './footer-main.component.html',
  styleUrls: ['./footer-main.component.sass']
})
export class FooterMainComponent implements OnInit {
  title : string;
  constructor() {
    this.title="hell";
  }

  ngOnInit() {
  }

}
