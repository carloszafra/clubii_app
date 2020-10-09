import { Injectable } from '@angular/core';
import { HttpHeaders, HttpClient } from '@angular/common/http';
import { pubI } from '../shared/models/publication.interface';
import { Observable } from 'rxjs';
import { GLOBAL } from './global'

@Injectable({
  providedIn: 'root'
})
export class PublicationService {

  public url;

  constructor( private _http: HttpClient) { 
    this.url = GLOBAL.url
  }

  uploadPost(post: pubI, token: any): Observable<any> {
    let params = JSON.stringify(post);
    console.log(params)
    console.log(this.url)

    let headers = new HttpHeaders()
    .set('Content-Type', 'application/json')
    .set('Authorization', `Bearer ${token}`)

    return this._http.post(`${this.url}publications/new`, params, {headers: headers});
  }
}
