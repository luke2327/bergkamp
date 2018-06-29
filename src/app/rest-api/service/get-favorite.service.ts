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
//TODO favoriteservice class 내부에 get put을 두는게 더 깔끔할꺼 같아서 그렇게 바꿀예정
@Injectable()
export class GetFavoriteService {

  constructor(private http: HttpClient) {}

  getFavorite(): Observable<any> {
    return this.http.get(RestUrlBase+RestUrlFavorite+'2', httpOptions);
  }
}
