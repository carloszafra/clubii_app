import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { userI } from '../../shared/models/user.interface';
import { AuthService } from '../../services/auth.service';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styles: [ 
  ]
})
export class RegisterComponent implements OnInit {

  public formSubmitted: boolean = false;

  public registerForm = this.fb.group({
    email: ['', [Validators.required, Validators.email]],
    username: ['', Validators.required],
    password1:  ['', Validators.required],
    password2:  ['', Validators.required]
  },{
    validators: this.equalPasswords('password1', 'password2')
  })

  constructor(
    private authSvc: AuthService,
    private fb: FormBuilder
  ) 
  {}

  ngOnInit(): void {
  }

  OnRegister(){
    this.formSubmitted = true;

    if(this.registerForm.valid){
      const preuser = this.registerForm.value;

      const user: userI = {
        email: preuser.email,
        username: preuser.username,
        password: preuser.password1
      }

      this.authSvc.register(user).subscribe(
        response => {
          console.log(response);
          Swal.fire('Success', response.message, 'success')
        },
        error =>{
          console.log(error);
          Swal.fire('Error', error.error.message, 'warning')
        }
      )
    }else{
      console.log('errooor')
    }
  }

  invalidPasswords(){
    const pass1 = this.registerForm.get('password1').value;
    const pass2 = this.registerForm.get('password2').value;

    if((pass1 !== pass2) && this.formSubmitted){
      return true;
    }else{
      return false;
    }
  }

  invalidField( field: string ): boolean{
    if( this.registerForm.get(field).invalid && this.formSubmitted ){
      return true;
    }

    return false;
  }

  equalPasswords(pass1: string, pass2: string){
    return (formGroup: FormGroup) => {
      const pass1control = formGroup.get(pass1);
      const pass2control = formGroup.get(pass2);

      if(pass1control.value === pass2control.value){
        pass2control.setErrors(null)
      }else{
        pass2control.setErrors({noEsIgual: true})
      }
    }
  }
 
}
