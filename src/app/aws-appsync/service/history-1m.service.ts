import { Injectable } from '@angular/core';
import { Observable } from 'rxjs/Observable';
import { AppsyncService } from './appsync.service';
import GetHistory1m from '../query/get-history-1m';
import SubscribeHistory1m from '../subscription/subscribe-history-1m';
import { GetHistory1mQuery } from '../types/EventAPI';
import AWSAppSyncClient from 'aws-appsync';
import { ObservableQuery } from 'apollo-client';

@Injectable()
export class History1mService {

  queryObservable;

  constructor(private appsync: AppsyncService) {

    this.queryObservable = new Observable((observer) => {

      this.appsync.hc().then(client => {
        //TODO variables 가져오는부분은 추후수정하자..
        const observable : ObservableQuery<GetHistory1mQuery> = client.watchQuery({
          query: GetHistory1m,
          variables : { id : 'ETH/USDT', asending : false, ut: 1526910390, limit: 100 },
          fetchPolicy: 'network-only'
        });
        //getAllSnapshot 을 우선 가져온다.
        observable.subscribe(({data}) => {
          if (data) {
            console.log('GetHistory1m');
            // 정보를 전달
            observer.next(data);
          }
        });
        //subscription
        observable.subscribeToMore({
          document: SubscribeHistory1m,
          variables : { id : 'HAM/TEST'},
          updateQuery: (prev: GetHistory1mQuery, {subscriptionData}) => {
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
