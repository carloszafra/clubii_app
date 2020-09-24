import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { BrowserModule } from '@angular/platform-browser'

import { ChatComponent } from './chat/chat.component';
import { HeaderComponent } from './header/header.component';
import { NavbarComponent } from './navbar/navbar.component';
import { FloatyComponent } from './floaty/floaty.component';



@NgModule({
  declarations: [
    ChatComponent,
    HeaderComponent,
    NavbarComponent,
    FloatyComponent
  ],
  imports: [
    CommonModule,
    RouterModule,
    BrowserModule
  ],
  exports: [
    ChatComponent,
    HeaderComponent,
    NavbarComponent,
    FloatyComponent
  ]
})
export class SharedModuleModule { }
