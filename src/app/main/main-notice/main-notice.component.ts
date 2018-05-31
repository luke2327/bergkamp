import { Component, OnInit } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { NgbCarouselConfig } from '@ng-bootstrap/ng-bootstrap';
import { map } from 'rxjs/operators';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
@Component({
  selector: 'app-main-notice',
  templateUrl: './main-notice.component.html',
  styleUrls: ['./main-notice.component.css']
})
//carousel 구현 샘플만 간략히 해둔다
//TODO 추후 실제데이터로 바꿔야함
export class MainNoticeComponent implements OnInit {

  images: Array<string>;
  constructor(config: NgbCarouselConfig, private _http: HttpClient) {
    config.interval = 10000;
    config.wrap = true;
    config.keyboard = false;
  }

  ngOnInit() {
    this._http.get('https://picsum.photos/list')
        .pipe(map((images: Array<{id: number}>) => this.randomImageUrls(images)))
        .subscribe(images => this.images = images);
  }
  private randomImageUrls(images: Array<{id: number}>): Array<string> {
    return [1, 2, 3].map(() => {
      const randomId = images[Math.floor(Math.random() * images.length)].id;
      return `https://picsum.photos/900/500?image=${randomId}`;
    });
  }

}
