import { Injectable } from '@angular/core';
import { Http, Response, Headers } from '@angular/http';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs/Observable';
import { RestUrlBase, RestUrlOrder, RestUrlOrderMy, RequestOptions } from '../../app.const';
import { OrderDataService } from '../service/order-data.service';

/*
 주문관련 rest-api 모음
*/
@Injectable()
export class OrderService {
  //TODO 일단 api 헤더들이 대충 정리가 된이후 하나로 합칠예정
  httpOptions: RequestOptions = {
    headers: new HttpHeaders({
      'Content-Type': 'application/json'
    })
    ,observe : 'response'
  };

  constructor(private http: HttpClient, private orderDataService: OrderDataService) {
    // this.httpOptions.observe = 'response';
  }

  //[post] /order
  postOrder(jsonBody: any): void {
    this.http.post(RestUrlBase+RestUrlOrder, jsonBody, this.httpOptions)
      .subscribe(data => {
      console.log('this is good!!!');
      this.orderDataService.setPostOrder(data);
    });
  }

  //[get] /order/my
  getOrderMy(): void {
    this.http.get(RestUrlBase+RestUrlOrderMy, this.httpOptions)
      .subscribe(data => {
      this.orderDataService.setGetOrderMy(data);
    });
  }

  //[put] /order/{order}
  putOrder(order:any): void {
    this.http.put(RestUrlBase+RestUrlOrder+order, this.httpOptions)
      .subscribe(data => {
      this.orderDataService.setPutOrder(data);
    });
  }

  //[delete] /order/{order}
  deleteOrder(order:any): void {
    this.http.delete(RestUrlBase+RestUrlOrder+order, this.httpOptions)
      .subscribe(data => {
      this.orderDataService.setDeleteOrder(data);
    });
  }
}
