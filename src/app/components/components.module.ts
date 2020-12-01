import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { HubSidebarComponent } from './hub-sidebar/hub-sidebar.component';
import { RouterModule } from '@angular/router';
import { ProfileHeaderComponent } from './profile-header/profile-header.component';
import { SectionNavigationComponent } from './section-navigation/section-navigation.component';
import { FileUploadComponent } from './file-upload/file-upload.component';
import { NgxDropzoneModule } from 'ngx-dropzone';
import { NewsfeedTimelineComponent } from './newsfeed-timeline/newsfeed-timeline.component';
import { ImageComponent } from './image/image.component';
import { ScrollingModule } from '@angular/cdk/scrolling'


@NgModule({
  declarations: [
    HubSidebarComponent, 
    ProfileHeaderComponent, 
    SectionNavigationComponent, 
    FileUploadComponent, 
    NewsfeedTimelineComponent, 
    ImageComponent
  ],
  imports: [
    CommonModule,
    RouterModule,
    NgxDropzoneModule,
    ScrollingModule
  ],
  exports: [
    HubSidebarComponent,
    ProfileHeaderComponent,
    SectionNavigationComponent,
    FileUploadComponent,
    NewsfeedTimelineComponent,
    ImageComponent
  ]
})
export class ComponentsModule { }
