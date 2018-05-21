import { Component, OnInit } from '@angular/core';
import { AppsyncService } from '../aws-appsync/service/appsync.service';
import GetAllSnapshot from '../aws-appsync/query/get-allsnapshot';
import { GetAllSnapshotQuery } from '../aws-appsync/types/EventAPI';
import AWSAppSyncClient from 'aws-appsync';
import { ObservableQuery } from 'apollo-client';
import { AllSnapshotService } from '../aws-appsync/service/all-snapshot.service';
import { History1hService } from '../aws-appsync/service/history-1h.service';
import { History1mService } from '../aws-appsync/service/history-1m.service';
@Component({
  selector: 'app-main',
  templateUrl: './main.component.html',
  styleUrls: ['./main.component.css']
})
export class MainComponent implements OnInit {

  constructor(private allSnapshotService: AllSnapshotService,
              private history1hService: History1hService,
              private history1mService: History1mService) { }

  ngOnInit() {
    // this.appsync.currentMessage.subscribe(message => this.message = message);
    this.allSnapshotService.queryObservable.subscribe((value) => {
      console.log(value);
    });

    this.history1hService.queryObservable.subscribe((value) => {
      console.log(value);
    });

    this.history1mService.queryObservable.subscribe((value) => {
      console.log(value);
    });
  }

}
