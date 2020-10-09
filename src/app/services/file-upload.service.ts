import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class FileUploadService {

  constructor( private _http: HttpClient ) { }

  fileUpload(fileData): Observable<any> {
    //let data = values;
    const data = new FormData();

    data.append('file', fileData);
    data.append('upload_preset', 'angular_cloudinary');
    data.append('cloud_name', 'clubii');

    return this._http.post(
      'https://api.cloudinary.com/v1_1/clubii/image/upload',
      data
    )
  }
}
