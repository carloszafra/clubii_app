import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { AppRoutingModule } from '../app-routing.module';
import { RouterModule } from '@angular/router'
import { NewsfeedComponent } from './newsfeed/newsfeed.component';
import { SharedModuleModule } from '../shared/shared-module.module';


@NgModule({
  declarations: [NewsfeedComponent],
  imports: [
    CommonModule,
    RouterModule,
    AppRoutingModule,
    SharedModuleModule
  ],
  exports: [
    NewsfeedComponent
  ]
})
export class NewsfeedModule { }
