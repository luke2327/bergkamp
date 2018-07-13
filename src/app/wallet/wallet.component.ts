import { Component, OnInit } from '@angular/core';
import { SnapshotService } from '../aws-appsync/service/snapshot.service';
import { SnapshotDataService } from '../aws-appsync/service/snapshot-data.service';
@Component({
  selector: 'app-wallet',
  templateUrl: './wallet.component.html',
  styleUrls: ['./wallet.component.sass']
})
export class WalletComponent implements OnInit {

  constructor(private snapshotService: SnapshotService,
              private snapshotDataService: SnapshotDataService) { }

  ngOnInit() {
    this.snapshotService.startQuery();
    this.snapshotService.queryObservable.subscribe((value) => {
      this.snapshotDataService.setSnapshot(value);
    });
  }

}
