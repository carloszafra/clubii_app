import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { PagenotfoundComponent } from './pagenotfound/pagenotfound.component';
import { AccountHubRoutingModule } from './account-hub/account-hub.routing.module';
import { LandingComponent } from './auth/landing/landing.component';


const routes: Routes = [
  { path: 'landing', component: LandingComponent },
  { path: '', redirectTo: '/account-hub', pathMatch: 'full'},
  { path: '**', component: PagenotfoundComponent }

];

@NgModule({
  imports: [
    RouterModule.forRoot(routes),
    AccountHubRoutingModule
  ],
  exports: [RouterModule]
})
export class AppRoutingModule { }
