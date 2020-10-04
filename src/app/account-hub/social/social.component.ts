import { Component, OnInit } from '@angular/core';
import { AuthService } from '../../services/auth.service';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { Observable } from 'rxjs';
import { userI } from 'src/app/shared/models/user.interface';

@Component({
  selector: 'app-social',
  templateUrl: './social.component.html',
  styles: [
  ]
})
export class SocialComponent implements OnInit {

  public socialForm;
  public user$: Observable<any>;
  public user: userI;

  constructor( 
    private authSvc: AuthService 
    ) 
    { 
    this.socialForm = new FormGroup({
      twitter: new FormControl('', Validators.required),
      instagram: new FormControl('', Validators.required)
    });

    this.user$ = this.authSvc.getLoggedUser();
  }

  ngOnInit(): void {
    this.user$.subscribe(
      response => {
        this.user = response;
        this.initValueForm(this.user);
      },
      error => {
        console.log(error);
      }
    )
  }

  onEditProfile(value: userI): void{
    this.authSvc.editUser(value).subscribe(
      response => {
       console.log(response);
      },
      error => {
        console.log(error);
      }
    )
  }

  private initValueForm(userData: userI): void{
    this.socialForm.patchValue({
      twitter: userData.twitter,
      instagram: userData.instagram
    })
  }


}
