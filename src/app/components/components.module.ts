import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { HubSidebarComponent } from './hub-sidebar/hub-sidebar.component';
import { RouterModule } from '@angular/router';


@NgModule({
  declarations: [HubSidebarComponent],
  imports: [
    CommonModule,
    RouterModule
  ],
  exports: [
    HubSidebarComponent
  ]
})
export class ComponentsModule { }
