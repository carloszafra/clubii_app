import { Routes, RouterModule } from '@angular/router';
import { NgModule } from '@angular/core';

import { TimelineComponent } from './timeline/timeline.component';
import { ProfileComponent } from './profile.component';


const routes: Routes = [
    {
        path: 'profile/:id',
        component: ProfileComponent,
        children: [
            { path: '', redirectTo:'timeline', pathMatch: 'full'},
            { path: 'timeline', component: TimelineComponent, data: {title: 'Profile timeline'} }
        ]
    },
];

@NgModule({
    imports: [RouterModule.forChild(routes)],
    exports: [RouterModule]
})
export class ProfileRoutingModule {}