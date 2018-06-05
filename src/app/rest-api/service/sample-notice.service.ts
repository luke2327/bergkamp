import { Injectable } from '@angular/core';
import { Http, Response, Headers } from '@angular/http';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs/Observable';
import { SampleNoticeRes } from "../model/notice";
import { RestUrlBase, RestUrlNotice } from '../../app.const';
import { getLang, getCountry } from '../../app.util';

//일단 여기 위치하는게 맘에 안들지만
//나중에 rest-api가 어떻게 되는지 쫌더 살펴보고
//헤더정보를 처리하도록 한다.
const httpOptions = {
  headers: new HttpHeaders({
    'Accept' : 'application/x-www-form-urlencoded',
    'Content-Type': 'application/x-www-form-urlencoded',
    'Locale' : getLang() + '-' + getCountry()
  })
};

@Injectable()
export class SampleNoticeService {
  //아직 확실하지않아 우선 sample이라고 명명함..
  constructor(private http: HttpClient) {}

  getSampleNotice(): Observable<any> {
    return this.http.get(RestUrlBase+RestUrlNotice, httpOptions);
  }
}
