import { Component, OnInit, AfterViewInit, ViewChildren, QueryList, AfterContentInit } from '@angular/core';
import { userI } from '../shared/models/user.interface';
import { AuthService } from '../services/auth.service';
import { ActivatedRoute } from '@angular/router';
import { FollowService } from '../services/follow.service';
import { FriendshipService } from '../services/friendship.service';
import { delay } from 'rxjs/operators';
import Swal from 'sweetalert2';

declare function customInitFunctions();

@Component({
  selector: 'app-users', 
  templateUrl: './users.component.html',
  styles: [
  ] 
})
export class UsersComponent implements OnInit, AfterViewInit {

  public users: userI[] = [];
  public userLog: userI;
  public from: number = 0;
  public total: number;
  public following: string[] = [];
  public friends: string[] = [];
  public pending: string[] = [];
  public mouseEnter: string;
  public mEnter: string;
  public loading: boolean = true;
  @ViewChildren('itemUsers') itemUsers: QueryList<any>;

  constructor( 
    private authSvc: AuthService, 
    private _route: ActivatedRoute,
    private followSvc: FollowService,
    private friendSvc: FriendshipService
  ) 
  {
    this.userLog = this.authSvc.getIdentity();
  }

  ngOnInit(): void {  
    this.getUsers();
    this.getFollowing();
    this.getFriends();
    this.getFriendshipReq();
  }

  ngAfterViewInit(): void{
    customInitFunctions();
     this.itemUsers.changes.pipe(
      delay(1000)
     ).subscribe( t => {
      customInitFunctions();
    })
    
  }

  getUsers(){
    this.loading = true;
    this.authSvc.getUsers(this.from).subscribe(
      ({users, total})=>{
        console.log(users);
        console.log(total)
        this.users = users;
        this.total = total;
        this.loading = false;
      },
      error => {
        console.log(error)
      }
    )
  }

  getFollowing(){
    this.followSvc.getFollowing(this.userLog._id).subscribe(
      resp =>{
        console.log(resp)
        this.following = resp
        this.following
      },
      err => {
        console.log(err)
      }
    )
  }

  getFriends(){
    this.friendSvc.getFriendsId(this.userLog._id).subscribe(
      resp => {
        this.friends = resp;
      },
      err => {
        console.log(err)
      }
    )
  }

  getFriendshipReq(){
    this.friendSvc.getPendingId(this.userLog._id).subscribe(
      resp => {
        console.log(resp)
        this.pending = resp;
      },
      err => console.log(err)
    )
  }

  changePage( value: number): void{
    console.log(value)
    this.from += value;
    if(this.from < 0) this.from = 0;
    if(this.from > this.total) this.from -= value;
    this.getUsers();
  }

  execScripts(): void{
    customInitFunctions();
  }

  followUser(userId): void{
    this.followSvc.followUser(userId).subscribe(
      (resp: any) => {
        console.log(resp)
        this.following.push(userId);
        
      },
      error =>{
        console.log(error)
      }
    )
  }

  unfollow(userId): void{
    console.log(userId);
    this.followSvc.deleteFollow(userId).subscribe(
      resp => {
        console.log(resp)
        let search = this.following.indexOf(userId);
        this.following.splice(search, 1);
      },
      err => {
        console.log(err)
      }
    )
  }

  friendRequest(userId): void {
    this.friendSvc.friendRequest(userId).subscribe(
      resp => {
        console.log(resp)
        this.pending.push(userId);
      },
      err => console.log(err)
    )
  }

  //Efectos para el follow

  mouseOver(userId: string){
    this.mouseEnter = userId;
  }

  mouseLeave(){
    this.mouseEnter = null;
  }

  // Efectos paral boton de amistad

  mouseOverF(userId: string){
    this.mEnter = userId;
  }

  mouseLeaveF(){
    this.mEnter = null;
  }

}
