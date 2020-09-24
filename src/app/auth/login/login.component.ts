import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { userI } from '../../shared/models/user.interface';
import { AuthService } from '../../services/auth.service';
import { Router } from '@angular/router';


@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styles: [
  ]
})
export class LoginComponent implements OnInit {  

  public loginForm; 
  public token;
  public identity;

  constructor(
    private authSvc: AuthService,
    private router: Router,
  ) 
  { 
    this.loginForm = new FormGroup({
      email: new FormControl('', Validators.required),
      password: new FormControl('', Validators.required) 
    })
  }

  ngOnInit(): void {
  }

  OnLogin(value: userI){
    console.log(value);
    this.authSvc.login(value).subscribe(
      response => {
        console.log(response);
        //console.log(`token: ${response.token}, email: ${response.user}`)
        
        //Persistir sesión en LocalStorage
        this.token = response.token;
        this.identity = response.user;
        localStorage.setItem('token', JSON.stringify(this.token));
        localStorage.setItem('identity', JSON.stringify(this.identity));

       window.location.replace('/');

       // this.router.navigate(['/'])
      },
      error => {
        console.log(error);
      }
    )
  }

}
