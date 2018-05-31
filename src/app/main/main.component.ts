import { Component, OnInit } from '@angular/core';
import { AppsyncService } from '../aws-appsync/service/appsync.service';
import GetSnapshot from '../aws-appsync/query/get-snapshot';
import AWSAppSyncClient from 'aws-appsync';
import { ObservableQuery } from 'apollo-client';
import { SnapshotService } from '../aws-appsync/service/snapshot.service';
import { HistoryService } from '../aws-appsync/service/history.service';
@Component({
  selector: 'app-main',
  templateUrl: './main.component.html',
  styleUrls: ['./main.component.css']
})
export class MainComponent implements OnInit {

  constructor(private snapshotService: SnapshotService,
              private historyService: HistoryService) { }

  ngOnInit() {
    // this.appsync.currentMessage.subscribe(message => this.message = message);
    this.snapshotService.startObserver();

    this.historyService.queryObservable.subscribe((value) => {
      console.log(value);
    });
  }

}
