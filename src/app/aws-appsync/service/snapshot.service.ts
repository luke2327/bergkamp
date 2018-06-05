import { Injectable } from '@angular/core';
import { Observable } from 'rxjs/Observable';
import { AppsyncService } from './appsync.service';
import GetSnapshot from '../query/get-snapshot';
import SubscribeSnapshot from '../subscription/subscribe-snapshot';
import { GetSnapshotQuery } from '../types/EventAPI';
import AWSAppSyncClient from 'aws-appsync';
import { ObservableQuery } from 'apollo-client';

@Injectable()
export class SnapshotService {

  queryObservable;

  constructor(private appsync: AppsyncService) {
    //constructor에서는 appsync 객체만 생성하는걸로 바꾼다.
    //call까지 같이 있으면 여러군데서 subscribe하는 경우 동시에 실행되어버린다.
    // console.log("service start");
  }
  startObserver(): void {
    //call 동작은 이곳으로 옮김
    this.queryObservable = new Observable((observer) => {
      this.appsync.hc().then(client => {
        const observable : ObservableQuery<GetSnapshotQuery> = client.watchQuery({
          query: GetSnapshot,
          variables : { id_ : 'all_sample' },
          fetchPolicy: 'network-only'
        });
        //getAllSnapshot 을 우선 가져온다.
        observable.subscribe(({data}) => {
          if (data) {
            console.log('getSnapshot');
            // 정보를 전달
            observer.next(data.getSnapshot.pairs);
          }
        });
        //subscription
        // observable.subscribeToMore({
        //   document: SubscribeSnapshot,
        //   variables : { id_ : 'all_sample' },
        //   updateQuery: (prev: GetSnapshotQuery, {subscriptionData}) => {
        //     console.log('subscribeToMore - updateQuery:', subscriptionData);
        //
        //     observer.next(subscriptionData.data.subscribeSnapshot.pairs);
        //     return null;
        //   }
        // });
      });
    });
  }

}
