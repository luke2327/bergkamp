import { Component, OnInit } from '@angular/core';
// import { AllSnapshotService } from '../../aws-appsync/service/all-snapshot.service';
@Component({
  selector: 'app-quotes',
  templateUrl: './quotes.component.html',
  styleUrls: ['./quotes.component.sass']
})
//시세요약류 정보 관리 component example
//TODO 아직 정확한 정보가 없으므로 추후 변경하도록 한다.
export class QuotesComponent implements OnInit {

  quotesValues;

  // constructor(private allSnapshotService: AllSnapshotService) { }

  ngOnInit() {
    // this.allSnapshotService.queryObservable.subscribe((value) => {
    //   console.log('in quotes');
    //   console.log(value.getAllSnapshot);
    //   this.quotesValues = value.getAllSnapshot;
    // });

  }

}
