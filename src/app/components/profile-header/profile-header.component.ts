import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { AuthService } from 'src/app/services/auth.service';
import { userI } from 'src/app/shared/models/user.interface';

@Component({
  selector: 'app-profile-header',
  templateUrl: './profile-header.component.html',
  styles: [
  ]
})
export class ProfileHeaderComponent implements OnInit {

  public user: userI;
  public userLoged: userI;
  //@Output() outValue: EventEmitter<userI> = new EventEmitter();

  constructor( 
    private _route: ActivatedRoute,
    private authSvc: AuthService
  ) { }

  ngOnInit(): void {
    this.getUserId();
  }

  getUserId(): void {
    const userId = this._route.snapshot.params.id;
    console.log(userId);
    this.getUser(userId);
  }

  getUser(userId: any){
    this.authSvc.getUser(userId).subscribe(
      response => {
        console.log(response.user)
        this.user = response.user;
        //this.outValue.emit(this.user);
      },
      error => {
        console.log(error)
      }
    )
  }
}
