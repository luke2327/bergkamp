import { Component, OnInit, AfterViewInit } from '@angular/core';
import { SnapshotService } from '../../aws-appsync/service/snapshot.service';
import { SnapshotDataService } from '../../aws-appsync/service/snapshot-data.service';
import { SnapshotDataFragment } from '../../aws-appsync/types/EventAPI';
import { significantFig } from '../../app.util';
import { GetFavoriteService } from '../../rest-api/service/get-favorite.service';
import { PutFavoriteService } from '../../rest-api/service/put-favorite.service';
import { PairInfoComponent } from '../../trade/pair-info/pair-info.component';
@Component({
  selector: 'app-tymx-token-quote',
  templateUrl: './tymx-token-quote.component.html',
  styleUrls: ['./tymx-token-quote.component.sass']
})
/*
  ------------------------------------------------------
  수정 2018/6/20 : angular material tab으로 바꿔준다.
  아마도 제대로 잘 구현해둔(?) trade/pair-info를 상속받아서 쓰면
  잘 동작하겠...
  ------------------------------------------------------
*/
export class TymxTokenQuoteComponent extends PairInfoComponent implements OnInit, AfterViewInit {
  significantFig: any;
  ngOnInit() {
    this.significantFig = significantFig;
  }
}
