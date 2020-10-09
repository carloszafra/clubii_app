import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { AppRoutingModule } from '../app-routing.module';
import { RouterModule } from '@angular/router'
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { NewsfeedComponent } from './newsfeed/newsfeed.component';
import { SharedModuleModule } from '../shared/shared-module.module';


@NgModule({
  declarations: [NewsfeedComponent],
  imports: [
    CommonModule,
    RouterModule,
    AppRoutingModule,
    SharedModuleModule,
    FormsModule,
    ReactiveFormsModule
  ],
  exports: [
    NewsfeedComponent
  ]
})
export class NewsfeedModule { }
