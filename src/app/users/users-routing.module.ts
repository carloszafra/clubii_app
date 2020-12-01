import { Routes, RouterModule } from '@angular/router';
import { NgModule } from '@angular/core';

import { UsersComponent } from './users.component';

const routes: Routes = [
    {
        path: 'members',
        component: UsersComponent,
        data: {title: 'Members'},
        children: []
    }
];

@NgModule({
    imports: [ RouterModule.forChild(routes)], 
    exports: [RouterModule]
})
export class UsersRoutingModule {}