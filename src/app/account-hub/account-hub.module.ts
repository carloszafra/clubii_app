import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { SharedModuleModule } from '../shared/shared-module.module';
import { AppRoutingModule } from '../app-routing.module';
import { ReactiveFormsModule, FormsModule} from '@angular/forms';
import { RouterModule } from '@angular/router';
import { NgxDropzoneModule } from 'ngx-dropzone';

import { ComponentsModule } from '../components/components.module';

import { SettingsComponent } from './settings/settings.component';
import { GroupSettingsComponent } from './group-settings/group-settings.component';
import { AccountHubComponent } from './account-hub.component';
import { SocialComponent } from './social/social.component';
import { FriendRequestComponent } from './friend-request/friend-request.component';
import { NewGroupComponent } from './groups/new-group.component'
import { GroupManageComponent } from './groups/group-manage.component';


@NgModule({
  declarations: [
    SettingsComponent, 
    GroupSettingsComponent, 
    AccountHubComponent, 
    SocialComponent,
    FriendRequestComponent,
    NewGroupComponent,
    GroupManageComponent
  ],
  imports: [
    CommonModule,
    FormsModule,
    RouterModule,
    ReactiveFormsModule,
    NgxDropzoneModule,
    SharedModuleModule,
    AppRoutingModule,
    ComponentsModule
  ],
  exports: [
    SettingsComponent, 
    GroupSettingsComponent, 
    AccountHubComponent,
    SocialComponent,
    FriendRequestComponent,
    NewGroupComponent,
    GroupManageComponent
  ]
})
export class AccountHubModule { }
//clubii/carloszafra
//clubii/:userid o user.username