import { Injectable } from '@angular/core';
import { Http, Response, Headers } from '@angular/http';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs/Observable';
import { RestUrlBase, RestUrlFavorite } from '../../app.const';

const httpOptions = {
  headers: new HttpHeaders({
    'Content-Type': 'application/json'
  })
};

@Injectable()
export class PutFavoriteService {

  constructor(private http: HttpClient) {}

  putFavorite(pairs: any): Observable<any> {
    let httpBody = {
      'pairs': pairs
    }
    return this.http.put(RestUrlBase+RestUrlFavorite+'2', httpBody, httpOptions);
  }

}
