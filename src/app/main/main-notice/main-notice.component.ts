import { Component, OnInit } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { NgbCarouselConfig } from '@ng-bootstrap/ng-bootstrap';
import { map } from 'rxjs/operators';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { SampleNoticeService } from '../../rest-api/service/sample-notice.service';
import { CommonSubComponent } from '../../common-sub/common-sub.component';
import { CompStateService } from '../../service/comp-state.service';
@Component({
  selector: 'app-main-notice',
  templateUrl: './main-notice.component.html',
  styleUrls: ['./main-notice.component.sass']
})
export class MainNoticeComponent extends CommonSubComponent implements OnInit {

  images: Array<string>;

  constructor(
    public sampleNoticeService: SampleNoticeService,
    public config: NgbCarouselConfig,
    public _http: HttpClient,
    public compStateService: CompStateService
  ) {
    super(compStateService);
    config.interval = 10000;
    config.wrap = true;
    config.keyboard = false;
    this.images = [];
  }

  ngOnInit() {

  }
  startComponent() {
    console.log(localStorage.getItem('info'));
    let notices = JSON.parse(localStorage.getItem('info')).notices;
    for(let entry of notices) {
      this.images.push(entry.image_link);
    }
  }
  startComponentErr() {

  }
}
