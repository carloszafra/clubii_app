import { Injectable } from '@angular/core';
import { HttpHeaders, HttpClient } from '@angular/common/http'
import { groupI } from '../shared/models/group.interface';
import { Observable } from 'rxjs';
import {environment} from '../../environments/environment';

const base_url = environment.base_url;

@Injectable({
  providedIn: 'root'
})
export class GroupsService {

  constructor( private _http: HttpClient ) { }

  get headers(): HttpHeaders {
    let token = JSON.parse(localStorage.getItem('token'));
    let headers = new HttpHeaders()
    .set('Content-Type','application/json')
    .set('Authorization', `Bearer ${token}`);

    return headers;
  }

  createGroup(group: groupI): Observable<any>{
    let params = JSON.stringify(group)
    let url = `${base_url}groups/new`
    return this._http.post(url, params, {headers: this.headers})
  }
}
