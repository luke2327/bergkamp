import { Component, OnInit, AfterViewInit, ViewChild, OnDestroy, ChangeDetectorRef } from '@angular/core';
import { SnapshotDataService } from '../../aws-appsync/service/snapshot-data.service';
import { SnapshotDataFragment } from '../../aws-appsync/types/EventAPI';
import { MatTableDataSource, MatSort, MatTable } from '@angular/material';
import { MatTabChangeEvent } from '@angular/material';
import { Sort } from '@angular/material';
import { GetFavoriteService } from '../../rest-api/service/get-favorite.service';
import { PutFavoriteService } from '../../rest-api/service/put-favorite.service';
import { TradeFavoriteButtonDirective } from '../../directive/trade-favorite-button.directive';
import { Router } from '@angular/router';
@Component({
  selector: 'app-pair-info',
  templateUrl: './pair-info.component.html',
  styleUrls: ['./pair-info.component.sass']
})
export class PairInfoComponent implements OnInit, AfterViewInit, OnDestroy {

  quotesValues: any = [];
  quotesBeforePrices: any;
  baseLists: any = [];
  quotesValuesByBase: any;
  displayedColumns = ['pair', 'price', 'changepct24'];
  dataSource: any = [];
  favPairs: any = [];
  baseIds: any; //info 정보가 없으므로 우선은 id 저장용으로 만들어둠
  tabPosition: number = 0;
  snapShotSubScription: any;
  //sort 할 객체
  @ViewChild(MatSort) sort: MatSort;
  //table 객체
  @ViewChild('table') table: MatTable<any>;

  constructor(private snapshotDataService: SnapshotDataService,
    private getFavoriteService: GetFavoriteService,
    private putFavoriteService: PutFavoriteService,
    private router:Router) {
    this.quotesBeforePrices = new Map<string, number>();
    this.quotesValuesByBase = new Map<string, any>();
    this.baseIds = new Map<string, number>();
  }

  ngOnInit() {}
  ngAfterViewInit(){
    //일단 요약류 정보를 가져오자
    this.snapShotSubScription = this.snapshotDataService.queryObservable.subscribe((value) => {
      console.log('this value&&&&');
      this.quotesValues = [];
      let index = 0;
      for(let entry of value){
        //결과를 적절히 object류로 만들어줌
        this.quotesValues.push(entry);
        this.baseIds.set(entry.pair, ++index);
        if(this.quotesBeforePrices.get(entry.pair) === undefined){
          this.quotesBeforePrices.set(entry.pair, entry.price);
        }
        this.quotesValuesByBase = new Map<string, any>();
      }
      this.baseLists = this.getBaseLists();
      this.getQuotesValuesByBase();
      this.dataSource = this.quotesValuesByBase.get(this.baseLists[0]);
      // this.table.renderRows();
    });
    //favorite도 불러오자
    //요약류 정보와 async하게 동작하고
    //어느것이 먼저들어오던지 상관없이 오류가 나지않도록 설계
    this.getFavoriteService.getFavorite().subscribe(data => {
      this.favPairs = data.pairs;
      // this.table.renderRows();
    });

  }
  ngOnDestroy() {
    this.snapShotSubScription.unsubscribe();
  }
  //base 종류가 뭐가있는지 리스트로 반환
  getBaseLists(): any[] {
    let baseSets = new Set([]);
    for(let entry of this.quotesValues){
      baseSets.add(entry.pair.split('/')[1]);
    }
    return Array.from(baseSets.values());
    // return ['ETH'];
  }
  //코인정보를 base 종류에 따라 분류한 map 내부 리스트 형태로 반환
  getQuotesValuesByBase(): void {
    for(let entry of this.quotesValues){
      if(this.quotesValuesByBase.get(entry.pair.split('/')[1]) === undefined){
        this.quotesValuesByBase.set(entry.pair.split('/')[1], []);
      }
      let beforeQuotes = this.quotesValuesByBase.get(entry.pair.split('/')[1]) ;
      beforeQuotes.push(entry);
      this.quotesValuesByBase.set(beforeQuotes);
    }
  }
  //tab이 변경되면 이곳을 호출하게 된다.
  tabChanged(tabChangeEvent: MatTabChangeEvent): void {
    //favorite류 정보갱신때문에 어쩔수 없이 전역변수를 쓸수밖에..
    this.tabPosition = tabChangeEvent.index;
    if(this.baseLists.length > this.tabPosition) {
      this.dataSource = this.quotesValuesByBase.get(this.baseLists[tabChangeEvent.index]);
    } else {
      this.dataSource = this.getFavoriteList();
    }
  }
  //데이터가 sort되면 여기에서 처리한다.
  sortData(sort: Sort) {
    //쌈빡하게 짜고싶...지만 이게 최선
    this.dataSource.sort((a, b) => {
      let isAsc = sort.direction == 'asc';
      switch (sort.active) {
        case 'pair': return compare(a.pair, b.pair, isAsc);
        case 'price': return compare(a.price, b.price, isAsc);
        case 'type': return compare(a.type, b.type, isAsc);
        default: return 0;
      }
    });
    this.table.renderRows();
  }
  //너는 favorite 이냐?
  isFavorite(pair: string): boolean {
    let id = this.baseIds.get(pair);
    try {
      return (this.favPairs.indexOf(id) > -1);
    } catch (e) {
      return false;
    }
  }
  //favorite을 설정하자
  //toggle형태로 동작해줘야하고
  //api call이 들어가야함
  setFavorite($event: MouseEvent, pair: string): void {
    console.log("setFavorite");
    event.stopPropagation();
    let id = this.baseIds.get(pair);
    let pairs = this.favPairs.slice();
    try {
      let indexOf = pairs.indexOf(id);
      if (indexOf > -1) {
        pairs.splice(indexOf, 1);
      } else {
        pairs.push(id);
      }
      this.putFavoriteService.putFavorite(pairs).subscribe(data => {
        this.favPairs = pairs.slice();
        if(this.baseLists.length == this.tabPosition) {
          this.dataSource = this.getFavoriteList();
        }
      });
    } catch (e) {}
  }
  routeTo(id: string): void {
    this.router.navigate(['/trade', id]);
  }
  //favorite tab에 보여질 favorite 리스트를 호출하자
  getFavoriteList(): any[] {
    let result = [];
    for(let entry of this.quotesValues) {
      let id = this.baseIds.get(entry.pair);
      if(this.favPairs.indexOf(id) > -1){
        result.push(entry);
      }
    }
    return result;
  }
}
function compare(a, b, isAsc) {
  return (a < b ? -1 : 1) * (isAsc ? 1 : -1);
}
