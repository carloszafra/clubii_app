import { Component, OnInit } from '@angular/core';
import { FormBuilder, Validators } from '@angular/forms';
import { groupI } from '../../shared/models/group.interface';
import { GroupsService } from '../../services/groups.service';
import { AuthService } from 'src/app/services/auth.service';
import { userI } from 'src/app/shared/models/user.interface';
import { Router } from '@angular/router';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-new-group',
  templateUrl: './new-group.component.html',
  styles: [
  ]
})
export class NewGroupComponent implements OnInit {

  public groupForm = this.fb.group({
    name: ['', Validators.required],
    description: ['', Validators.required]
  });
  public user: userI;

  constructor( 
    private fb: FormBuilder, 
    private groupSvc: GroupsService,
    private authSvc: AuthService, 
    private _router: Router,
    ) 
  { 
    this.user = this.authSvc.getIdentity();
  }

  ngOnInit(): void {
  }
  
  createGroup(value: groupI): void {
    value.creator = this.user._id;
    this.groupSvc.createGroup(value).subscribe(
      resp => {
        console.log(resp);
        Swal.fire('Success', 'Group created', 'success');
        this._router.navigateByUrl(`/account-hub/manage-group/${resp._id}`)
      },
      err => console.log(err)
    )
  }
}
