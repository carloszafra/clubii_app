import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class FileUploadService {

  constructor( private _http: HttpClient ) { }

  fileUpload(values): Observable<any> {
    let data = values;

    return this._http.post(
      'https://api.cloudinary.com/v1_1/clubii/image/upload',
      data
    )
  }
}
