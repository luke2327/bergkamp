import { Component, OnInit, AfterViewInit } from '@angular/core';
import { SnapshotService } from '../../aws-appsync/service/snapshot.service';
import { SnapshotDataService } from '../../aws-appsync/service/snapshot-data.service';
import { SnapshotDataFragment } from '../../aws-appsync/types/EventAPI';
import { significantFig } from '../../app.util';
@Component({
  selector: 'app-tymx-token-quote',
  templateUrl: './tymx-token-quote.component.html',
  styleUrls: ['./tymx-token-quote.component.css']
})
export class TymxTokenQuoteComponent implements OnInit, AfterViewInit {

  quotesValues: Array<SnapshotDataFragment> = [];
  significantFig = significantFig;
  constructor(private snapshotService: SnapshotService, private snapshotDataService:SnapshotDataService) {
  }

  ngOnInit() {
  }

  ngAfterViewInit(){

    this.snapshotDataService.queryObservable.subscribe((value) => {
      console.log('this');
      this.quotesValues = [];
      for(let entry of value){
        if(entry.type != 'BASE'){
          this.quotesValues.push(entry);
        }
      }
      console.log(this.quotesValues);
    });
  }
}
