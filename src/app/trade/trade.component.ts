import { Component, OnInit } from '@angular/core';
import { SnapshotService } from '../aws-appsync/service/snapshot.service';
import { SnapshotDataService } from '../aws-appsync/service/snapshot-data.service';
import { NotiToggleService } from '../service/noti-toggle.service';
@Component({
  selector: 'app-trade',
  templateUrl: './trade.component.html',
  styleUrls: ['./trade.component.sass']
})
export class TradeComponent implements OnInit {

  constructor(private snapshotService: SnapshotService,
              private snapshotDataService: SnapshotDataService,
              private notiToggleService:NotiToggleService) { }

  ngOnInit() {
    //이전페이지에서 noti창이 열려있었다면 닫아준다.
    this.notiToggleService.setOpen(false);
    this.snapshotService.startObserver();
    this.snapshotService.queryObservable.subscribe((value) => {
      this.snapshotDataService.setSnapshot(value);
    });
  }

}
