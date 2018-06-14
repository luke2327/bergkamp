import { Component, OnInit } from '@angular/core';
import { SnapshotService } from '../aws-appsync/service/snapshot.service';
import { SnapshotDataService } from '../aws-appsync/service/snapshot-data.service';
@Component({
  selector: 'app-trade',
  templateUrl: './trade.component.html',
  styleUrls: ['./trade.component.css']
})
export class TradeComponent implements OnInit {

  constructor(private snapshotService: SnapshotService,
              private snapshotDataService: SnapshotDataService) { }

  ngOnInit() {
    this.snapshotService.startObserver();
    this.snapshotService.queryObservable.subscribe((value) => {
      this.snapshotDataService.setSnapshot(value);
    });
  }

}
