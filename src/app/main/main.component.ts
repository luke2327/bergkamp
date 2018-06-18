import { Component, OnInit } from '@angular/core';
import { AppsyncService } from '../aws-appsync/service/appsync.service';
import GetSnapshot from '../aws-appsync/query/get-snapshot';
import AWSAppSyncClient from 'aws-appsync';
import { ObservableQuery } from 'apollo-client';
import { SnapshotService } from '../aws-appsync/service/snapshot.service';
import { SnapshotDataService } from '../aws-appsync/service/snapshot-data.service';
import { HistoryService } from '../aws-appsync/service/history.service';
@Component({
  selector: 'app-main',
  templateUrl: './main.component.html',
  styleUrls: ['./main.component.css']
})
export class MainComponent implements OnInit {

  constructor(private snapshotService: SnapshotService,
              private historyService: HistoryService,
              private snapshotDataService: SnapshotDataService) { }

  ngOnInit() {
    // this.appsync.currentMessage.subscribe(message => this.message = message);
    //수정완료 이곳에서 snapshot 정보를 부르고 snapshotDataService에 data를 보낸다.
    //하위 component는 이 데이터만 가져다 쓴다.
    this.snapshotService.startObserver();
    this.snapshotService.queryObservable.subscribe((value) => {
      this.snapshotDataService.setSnapshot(value);
    });
    // this.historyService.queryObservable.subscribe((value) => {
    //   console.log(value);
    // });
  }

}
