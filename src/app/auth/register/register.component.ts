import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { userI } from '../../shared/models/user.interface';
import { AuthService } from '../../services/auth.service';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styles: [ 
  ]
})
export class RegisterComponent implements OnInit {

  public registerForm;

  constructor(
    private authSvc: AuthService
  ) 
  { 
    this.registerForm = new FormGroup({
      email: new FormControl('', Validators.required),
      username: new FormControl('', Validators.required),
      password: new FormControl('', Validators.required)
    })
  }

  ngOnInit(): void {
  }

  OnRegister(value: userI){
    console.log(value);
    this.authSvc.register(value).subscribe(
      response => {
        console.log(response);
      },
      error => {
        console.log(error);
      }
    )
  }
 
}
