import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs/Observable';
import { RestUrlGeoLoc } from '../../app.const';
import { GeolocationDataService } from '../service/geolocation-data.service';
@Injectable()
export class GeolocationService {
  //geolocation 정보를 가져오는 방법
  //무제한 무료 라이브러리임..
  //https://geoip.nekudo.com/
  constructor(private http: HttpClient, private geolocationDataService: GeolocationDataService) {}

  // getGeoLocation(): Observable<any> {
  //   return this.http.get(RestUrlGeoLoc);
  // }
  getGeoLocation(): void {
    this.http.get(RestUrlGeoLoc)
      .subscribe(data =>{
        this.geolocationDataService.setGetGeolocation(data);
      });
  }
}
