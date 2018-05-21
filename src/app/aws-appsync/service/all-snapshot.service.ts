import { Injectable } from '@angular/core';
import { Observable } from 'rxjs/Observable';
import { AppsyncService } from './appsync.service';
import GetAllSnapshot from '../query/get-allsnapshot';
import SubscribeAllSnapshot from '../subscription/subscribe-allsnapshot';
import { GetAllSnapshotQuery } from '../types/EventAPI';
import AWSAppSyncClient from 'aws-appsync';
import { ObservableQuery } from 'apollo-client';

@Injectable()
export class AllSnapshotService {

  queryObservable;

  constructor(private appsync: AppsyncService) {

    this.queryObservable = new Observable((observer) => {

      this.appsync.hc().then(client => {

        const observable : ObservableQuery<GetAllSnapshotQuery> = client.watchQuery({
          query: GetAllSnapshot,
          fetchPolicy: 'network-only'
        });
        //getAllSnapshot 을 우선 가져온다.
        observable.subscribe(({data}) => {
          if (data) {
            console.log('getAllSnapshot');
            // 정보를 전달
            observer.next(data);
          }
        });
        //subscription
        observable.subscribeToMore({
          document: SubscribeAllSnapshot,
          updateQuery: (prev: GetAllSnapshotQuery, {subscriptionData}) => {
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
