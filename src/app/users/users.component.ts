import { Component, OnInit } from '@angular/core';
import { userI } from '../shared/models/user.interface';
import { AuthService } from '../services/auth.service';
import { ActivatedRoute } from '@angular/router';

declare function customInitFunctions();

@Component({
  selector: 'app-users',
  templateUrl: './users.component.html',
  styles: [
  ]
})
export class UsersComponent implements OnInit {

  public users: userI[]

  constructor( private authSvc: AuthService, private _route: ActivatedRoute ) { }

  ngOnInit(): void {  
    this.getPage();
    //customInitFunctions();
  }

  getPage(): void{
    const page = this._route.snapshot.params.page
    console.log(page)
    this.getUsers(page);
  }

  getUsers(page: any){
    this.authSvc.getUsers(Number(page)).subscribe(
      response =>{
        console.log(response);
        this.users = response.users;
      },
      error => {
        console.log(error)
      }
    )
  }

}
