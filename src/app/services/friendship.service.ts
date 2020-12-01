import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { environment } from '../../environments/environment';
import { Observable } from 'rxjs';

const base_url = environment.base_url;

@Injectable({
  providedIn: 'root'
})
export class FriendshipService {

  constructor(private http: HttpClient) { }

  get headers() {
    const token = JSON.parse(localStorage.getItem('token'));

    let headers = new HttpHeaders()
    .set('Content-Type', 'application/json')
    .set('Authorization', `Bearer ${token}`);
    return headers; 
  }

  getFriendsId(userId: string): Observable<any>{
    let url = `${base_url}friendship/friends/${userId}`;

    return this.http.get(url, {headers: this.headers});
  }

  getPendingId(userId: string): Observable<any> {
    let url = `${base_url}friendship/pendings/${userId}`;

    return this.http.get(url, {headers: this.headers});
  }

  friendRequest(userId: string): Observable<any>{
    let url = `${base_url}friendship/${userId}`;
    return this.http.get(url, {headers: this.headers});
  }

  getFriendsRequests(id: any): Observable<any>{
    let url = `${base_url}friendship/pending/${id}`;
    return this.http.get(url, {headers: this.headers})
  }

  acceptReq( friendshipId: string){
    let url = `${base_url}friendship/accept/${friendshipId}`;

    return this.http.get(url, {headers: this.headers});
  }

  rejectReq(friendshipId: string){
    let url = `${base_url}friendship/reject/${friendshipId}`;

    return this.http.get(url, {headers: this.headers});
  }
}
