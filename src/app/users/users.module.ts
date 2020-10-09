import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { UsersComponent } from './users.component';

import { SharedModuleModule } from '../shared/shared-module.module';



@NgModule({
  declarations: [UsersComponent],
  imports: [
    CommonModule,
    RouterModule,
    SharedModuleModule
  ],
  exports: [
    UsersComponent
  ]
})
export class UsersModule { }
