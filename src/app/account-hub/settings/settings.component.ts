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
  public avatarUrl: string = 'avatar';
  public coverUrl: string = 'cover';

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
    );

    console.log(this.user)
     
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

  

  

}
