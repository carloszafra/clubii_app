import { Routes, RouterModule } from '@angular/router';
import { NgModule } from '@angular/core';

import { NewsfeedComponent } from './newsfeed/newsfeed.component';

const routes: Routes = [
    {
        path: 'newsfeed',
        component: NewsfeedComponent,
        data: {title: 'Newsfeed'},
        children: []
    }
];

@NgModule({
    imports: [ RouterModule.forChild(routes) ],
    exports: [ RouterModule ]
})
export class NewsfeedRoutingModule {}