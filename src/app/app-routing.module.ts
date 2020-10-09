import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { PagenotfoundComponent } from './pagenotfound/pagenotfound.component';
import { AccountHubRoutingModule } from './account-hub/account-hub.routing.module';
import { NewsfeedRoutingModule } from './newsfeed/newsfeed.routing.module'
import { LandingComponent } from './auth/landing/landing.component';
import { ProfileRoutingModule } from './profile/profile.routing.module';
import { UsersRoutingModule } from './users/users-routing.module';


const routes: Routes = [
  { path: 'landing', component: LandingComponent },
  { path: '', redirectTo: '/account-hub', pathMatch: 'full'},
  { path: '**', component: PagenotfoundComponent }

];

@NgModule({
  imports: [
    RouterModule.forRoot(routes),
    AccountHubRoutingModule,
    NewsfeedRoutingModule,
    ProfileRoutingModule,
    UsersRoutingModule
  ],
  exports: [RouterModule]
})
export class AppRoutingModule { }
