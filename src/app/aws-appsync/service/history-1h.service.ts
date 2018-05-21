import { Injectable } from '@angular/core';
import { Observable } from 'rxjs/Observable';
import { AppsyncService } from './appsync.service';
import GetHistory1h from '../query/get-history-1h';
import SubscribeHistory1h from '../subscription/subscribe-history-1h';
import { GetHistory1hQuery } from '../types/EventAPI';
import AWSAppSyncClient from 'aws-appsync';
import { ObservableQuery } from 'apollo-client';

@Injectable()
export class History1hService {

  queryObservable;

  constructor(private appsync: AppsyncService) {

    this.queryObservable = new Observable((observer) => {

      this.appsync.hc().then(client => {
        //TODO 일단 id값 하나에 대해서 테스트해본후
        //그래프작업시 이부분은 수정하자
        const observable : ObservableQuery<GetHistory1hQuery> = client.watchQuery({
          query: GetHistory1h,
          variables : { id : 'ETH/USDT', asending : false, ut: 1526910390, limit: 100 },
          fetchPolicy: 'network-only'
        });
        //getAllSnapshot 을 우선 가져온다.
        observable.subscribe(({data}) => {
          if (data) {
            console.log('GetHistory1h');
            // 정보를 전달
            observer.next(data);
          }
        });
        //subscription
        observable.subscribeToMore({
          document: SubscribeHistory1h,
          variables : { id : 'HAM/TEST'},
          updateQuery: (prev: GetHistory1hQuery, {subscriptionData}) => {
            console.log('subscribeToMore - updateQuery:', subscriptionData);
            //데이터는 observer로 알려주고 따로 리턴하진 않는다.
            observer.next(subscriptionData);
            return null;
          }
        });
      });
    });
  }

}
