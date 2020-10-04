import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { ProfileComponent } from './profile.component';
import { SharedModuleModule } from '../shared/shared-module.module';
import { ComponentsModule } from '../components/components.module';
import { TimelineComponent } from './timeline/timeline.component';

import { AppRoutingModule } from '../app-routing.module';



@NgModule({
  declarations: [ProfileComponent, TimelineComponent],
  imports: [
    CommonModule,
    RouterModule,
    SharedModuleModule,
    ComponentsModule,
    AppRoutingModule
  ],
  exports: [
    ProfileComponent, 
    TimelineComponent
  ]
})
export class ProfileModule { }
