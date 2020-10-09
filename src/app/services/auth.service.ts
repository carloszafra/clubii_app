import { Injectable } from '@angular/core'; 
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { GLOBAL } from'./global';
import { Observable } from 'rxjs';
import { userI } from '../shared/models/user.interface';


@Injectable({
  providedIn: 'root'
})
export class AuthService {
  public url: string;
  public token: any;
  public userLoged: userI;

  constructor( public _http: HttpClient ) { 
    this.url = GLOBAL.url;
  }
  
  register( user: userI): Observable<any> {
    let params = JSON.stringify(user);
    let headers = new HttpHeaders().set('Content-type', 'application/json');

    return this._http.post(`${this.url}auth/register`, params, {headers: headers})
  }

  login( user: userI ): Observable<any> {
    let params = JSON.stringify(user);
    let headers = new HttpHeaders().set('Content-type', 'application/json');

    return this._http.post(`${this.url}auth/login`, params, {headers: headers})
  }

  getIdentity(): userI {
    let identity = JSON.parse(localStorage.getItem('identity'));
    if(identity != 'undefined'){
      this.userLoged = identity;
    }else{
      this.userLoged = null;
    }

    return this.userLoged;
  }

  getToken(): any {
    let token = JSON.parse(localStorage.getItem('token'));
    if(token != null){
      this.token = token;
    }else{
      this.token = null
    }
    console.log(token);
    return this.token;
  }

  editUser( newUser: userI ): Observable<any> {
    let params = JSON.stringify(newUser);
    const token = this.getToken();
    const user = this.getIdentity();

    let headers = new HttpHeaders()
    .set('Content-Type', 'application/json')
    .set('Authorization', `Bearer ${token}`);

    console.log(headers);

    return this._http.put(`${this.url}user/edit/${user._id}`, params, {headers: headers});
   
  }

  getLoggedUser(): Observable<object> {
    const token = this.getToken();

    let headers = new HttpHeaders()
    .set('Content-Type', 'application/json')
    .set('Authorization', `Bearer ${token}`);

    return this._http.get(`${this.url}user/logged`, {headers: headers})
  }

  getUsers(page?: any): Observable<any>{
    const token = this.getToken();

    let headers = new HttpHeaders()
    .set('Content-Type', 'application/json')
    .set('Authorization', `Bearer ${token}`);

    const from = (page * 5)- 5;

    const url = `${this.url}user?from=${from}`;

    return this._http.get(url, {headers: headers})
  }

  getUser(userId: any): Observable<any> {
    const token = this.getToken();
    let headers = new HttpHeaders()
    .set('Content-Type', 'application/json')
    .set('Authorization', `Bearer ${token}`);

    const url = `${this.url}user/${userId}`;

    return this._http.get(url, {headers: headers});
  }
  
}
