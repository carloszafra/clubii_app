import { HttpHeaders, HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from '../../environments/environment';

const base_url = environment.base_url;

@Injectable({
  providedIn: 'root'
})
export class FollowService {

  constructor( private _http: HttpClient ) { }

  get headers(){
    const token = JSON.parse(localStorage.getItem('token'));

    let headers = new HttpHeaders()
    .set('Content-Type', 'application/json')
    .set('Authorization', `Bearer ${token}`);

    return headers 
  }

  followUser(followedId: string){
    let url: string = `${base_url}follows/${followedId}`;

    return this._http.get(url, {headers: this.headers});
  }

  getFollowing( followerId: string ): Observable<any>{
    let url: string = `${base_url}follows/following/iden/${followerId}`

    return this._http.get(url, {headers: this.headers});
  }

  deleteFollow( followedId: string ): Observable<any>{
    let url: string = `${base_url}follows/${followedId}`

    return this._http.delete(url, {headers: this.headers})
  }
}
