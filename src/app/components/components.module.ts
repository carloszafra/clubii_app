import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { HubSidebarComponent } from './hub-sidebar/hub-sidebar.component';
import { RouterModule } from '@angular/router';
import { ProfileHeaderComponent } from './profile-header/profile-header.component';
import { SectionNavigationComponent } from './section-navigation/section-navigation.component';


@NgModule({
  declarations: [HubSidebarComponent, ProfileHeaderComponent, SectionNavigationComponent],
  imports: [
    CommonModule,
    RouterModule
  ],
  exports: [
    HubSidebarComponent,
    ProfileHeaderComponent,
    SectionNavigationComponent
  ]
})
export class ComponentsModule { }
