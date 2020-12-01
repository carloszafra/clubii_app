import { Component, OnInit } from '@angular/core';
import { friendshipI } from 'src/app/shared/models/friendship.interface';
import { FriendshipService } from '../../services/friendship.service';
import { AuthService } from '../../services/auth.service';
import { userI } from 'src/app/shared/models/user.interface';

@Component({
  selector: 'app-friend-request',
  templateUrl: './friend-request.component.html',
  styles: [
  ]
})
export class FriendRequestComponent implements OnInit {

  public requests: friendshipI[];
  public user: userI;
  public loading: boolean = true;
  public total: number;

  constructor( private friendSvc: FriendshipService, private authSvc: AuthService ) { 
    this.user = this.authSvc.getIdentity()  
  }

  ngOnInit(): void {
    this.getRequests()
  }

  getRequests(){
    this.loading = true;
    this.friendSvc.getFriendsRequests(this.user._id).subscribe(
      resp => {
        console.log(resp);
        this.requests = resp.requests;
        this.total = resp.total;
        this.loading = false;
      },
      err => console.log(err)
    )
  }

  acceptRequest(friendshipId: string): void {
    this.friendSvc.acceptReq(friendshipId).subscribe(
      resp => {
        console.log(resp);
        this.getRequests();
      },
      err => console.log(err)
    )
  }

  rejectRequest( friendshipId: string ): void {
    this.friendSvc.rejectReq(friendshipId).subscribe(
      resp => {
        console.log(resp);
        this.getRequests();
      },
      err => console.log(err)
    )
  }

}
