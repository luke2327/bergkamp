import { Injectable } from '@angular/core';
import { Http, Response, Headers } from '@angular/http';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs/Observable';
import { RestUrlBase, RestUrlOrder, RestUrlInfoAll, RequestOptions } from '../../app.const';
import { InfoDataService } from '../service/info-data.service';
@Injectable()
export class InfoService {

  httpOptions: RequestOptions;

  constructor(private http: HttpClient, private infoDataService: InfoDataService) { }

  getInfoAll(locale: any): void {
    this.httpOptions= {
      headers: new HttpHeaders({
        'Content-Type': 'application/json',
        'locale': locale
      })
      ,observe : 'response'
    };
    this.http.get(RestUrlBase+RestUrlInfoAll, this.httpOptions)
      .subscribe(data => {
        this.infoDataService.setInfoAll(data);
      });
  }

}
