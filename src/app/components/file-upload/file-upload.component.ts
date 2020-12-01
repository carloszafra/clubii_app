import { Component, OnInit, Input } from '@angular/core';
import { Observable } from 'rxjs';
import { User, userI } from 'src/app/shared/models/user.interface';
import { AuthService } from '../../services/auth.service';
import { FileUploadService } from '../../services/file-upload.service';

@Component({
  selector: 'app-file-upload',
  templateUrl: './file-upload.component.html',
  styles: [
  ]
})
export class FileUploadComponent implements OnInit { 
  
  files: File[] = [];
  @Input() type: string;
  public user$: Observable<any>;
  public userData: userI;
  public user: userI;

  constructor( private authSvc: AuthService, private fileSvc: FileUploadService) { 
    this.user$ = this.authSvc.getLoggedUser();
  }

  ngOnInit(): void {
    this.user$.subscribe(
      response => {
        console.log(response);
        this.userData = response;
       
      },
      error => console.log(error)
    )
  }
   
  private useAuthService(userData: userI ):void {
    this.authSvc.editUser(userData).subscribe(
      response => {
        this.user = response.user;
        console.log(this.user);
        this.authSvc.newImg.emit(this.user.avatarUrl);
        localStorage.setItem('identity', JSON.stringify(this.user));
      },
      error => {
        console.log(error)
      }
    )
  }

  /* ++++++++++++
  FILE HANDLING
  +++++++++++++++*/ 

  onSelect(event) {
    console.log(event);
    this.files.push(...event.addedFiles);
  }

  onRemove(event) {
    console.log(event);
    this.files.splice(this.files.indexOf(event), 1);
  }

  onUpload(): void {
    if(!this.files[0]) alert('no hay imagenes por subir');  

    const fileData = this.files[0];
    

    this.fileSvc.fileUpload(fileData).subscribe(
      response => {
        console.log(response);
        console.log(this.type)

        if (this.type === 'avatar'){
          this.userData.avatarUrl = response.secure_url;
         console.log(this.userData);
         this.useAuthService(this.userData);
        }else{
          this.userData.coverUrl = response.secure_url;
          console.log(this.userData);
          this.useAuthService(this.userData);
        }
        
       /* this.userData.avatarUrl = response.secure_url;
        console.log(this.userData);
        this.useAuthService(this.userData);*/
      },
      error => console.log(error)
    )
  }
}
