import { Injectable } from '@angular/core';
import { Http, Response, Headers } from '@angular/http';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs/Observable';
import { RestUrlBase, RestUrlOrder, RestUrlFavorite, RequestOptions } from '../../app.const';
import { FavoriteDataService } from '../service/favorite-data.service';

@Injectable()
export class FavoriteService {

  httpOptions: RequestOptions = {
    headers: new HttpHeaders({
      'Content-Type': 'application/json'
    })
    ,observe : 'response'
  };

  constructor(private http: HttpClient, private favoriteDataService: FavoriteDataService) {
    // this.httpOptions.observe = 'response';
  }

  getFavorite(): void {
    this.http.get(RestUrlBase+RestUrlFavorite, this.httpOptions)
      .subscribe(data => {
        this.favoriteDataService.setGetFavorite(data);
      });
  }

  putFavorite(jsonBody: any): void {
    this.http.put(RestUrlBase+RestUrlFavorite, jsonBody, this.httpOptions)
      .subscribe(data => {
        this.favoriteDataService.setPutFavorite(data);
      });
  }
}
