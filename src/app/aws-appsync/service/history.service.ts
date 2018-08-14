import { Injectable } from '@angular/core';
import { Observable } from 'rxjs/Observable';
import { AppsyncService } from './appsync.service';
import GetHistory from '../query/get-history';
import SubscribeHistory from '../subscription/subscribe-history';
import { GetHistoryQuery } from '../types/EventAPI';
import AWSAppSyncClient from 'aws-appsync';
import { ObservableQuery } from 'apollo-client';
@Injectable()
export class HistoryService {

  queryObservable;

  constructor(private appsync: AppsyncService) {}
  startObserver(interval): void {
    this.queryObservable = new Observable((observer) => {

      this.appsync.hc().then(client => {
        //TODO 일단 id값 하나에 대해서 테스트해본후
        //그래프작업시 이부분은 수정하자
        let now:number = Date.now();
        console.log(now);
        const observable: ObservableQuery<GetHistoryQuery> = client.watchQuery({
          query: GetHistory,
          variables : { id_ : 'ETH/USDT,'+interval },
          fetchPolicy: 'network-only'
        });
        //getAllSnapshot 을 우선 가져온다.
        observable.subscribe(({data}) => {
          if (data) {

            // 정보를 전달
            observer.next(data);
          }
        });
        // subscription
        observable.subscribeToMore({
          document: SubscribeHistory,
          variables : { id_ : 'ETH/USDT,'+interval},
          updateQuery: (prev: GetHistoryQuery, {subscriptionData}) => {
            console.log('subscribeToMore - updateQuery:', subscriptionData);
            //데이터는 observer로 알려주고 따로 리턴하진 않는다.
            console.log("hello");
            observer.next(subscriptionData);
            return null;
          }
        });
      });
    });
  }
}
