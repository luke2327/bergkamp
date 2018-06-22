import { Component, OnInit } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { NgbCarouselConfig } from '@ng-bootstrap/ng-bootstrap';
import { map } from 'rxjs/operators';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { SampleNoticeService } from '../../rest-api/service/sample-notice.service';
@Component({
  selector: 'app-main-notice',
  templateUrl: './main-notice.component.html',
  styleUrls: ['./main-notice.component.css']
})
//carousel 구현 샘플만 간략히 해둔다
//TODO 추후 실제데이터로 바꿔야함
export class MainNoticeComponent implements OnInit {

  images: Array<string>;

  constructor(private sampleNoticeService: SampleNoticeService,
              config: NgbCarouselConfig,
              private _http: HttpClient) {
    config.interval = 10000;
    config.wrap = true;
    config.keyboard = false;
    this.images = [];
  }

  ngOnInit() {
    this.sampleNoticeService.getSampleNotice().subscribe(data => {
      for(let entry of data.notices) {
        this.images.push(entry.image_link);
      }
    });
  }
}
