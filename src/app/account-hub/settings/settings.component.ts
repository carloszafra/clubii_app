import { Component, OnInit, OnDestroy } from '@angular/core'; 
import { FormControl, FormGroup, Validators } from '@angular/forms'
import { userI } from 'src/app/shared/models/user.interface';
import { AuthService } from '../../services/auth.service';
import { FileUploadService } from '../../services/file-upload.service';
import { Observable} from 'rxjs';

@Component({
  selector: 'app-settings',
  templateUrl: './settings.component.html',
  styles: [
  ]
})
export class SettingsComponent implements OnInit {

  public editProfileForm;
  public user$: Observable<any>;
  public userData: userI; 
  public user: userI;
  files: File[] = [];

  constructor( 
    private authSvc: AuthService,
    private fileSvc: FileUploadService
  ) 
  {
    this.editProfileForm = new FormGroup({
      name: new FormControl('', Validators.required ),
      description: new FormControl('', Validators.required ),
      email: new FormControl('', Validators.required ),
      birthday: new FormControl('', Validators.required ),
      country: new FormControl('', Validators.required )
    });
    
    this.user$ = this.authSvc.getLoggedUser();
    this.user = this.authSvc.getIdentity();
  }

  

  ngOnInit(): void {
    this.user$.subscribe(
      response => {
        console.log(response);
        this.userData = response;
        this.initValueForm(this.userData);
      },
      error => console.log
    )
     
  }

  OnEditProfile( value: userI ){
    this.useAuthService(value);
  }

  private useAuthService(userData: userI ):void {
    this.authSvc.editUser(userData).subscribe(
      response => {
        this.user = response.user;
        console.log(this.user);
        localStorage.setItem('identity', JSON.stringify(this.user));
      },
      error => {
        console.log(error)
      }
    )
  }

  /* ++++++++++++
  PRECARGAR FORMULARIO
  +++++++++++++++*/ 


  private initValueForm(userData: userI): void {
    this.editProfileForm.patchValue({
      name: userData.name,
      description: userData.description,
      email: userData.email,
      birthday: userData.birthday,
      country: userData.country
    })
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
    const data = new FormData();

    data.append('file', fileData);
    data.append('upload_preset', 'angular_cloudinary');
    data.append('cloud_name', 'clubii');

    this.fileSvc.fileUpload(data).subscribe(
      response => {
        console.log(response);
        
        this.userData.avatarUrl = response.secure_url;
        console.log(this.userData);
        this.useAuthService(this.userData);
      },
      error => console.log(error)
    )
  }

}
