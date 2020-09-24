import { Routes, RouterModule } from '@angular/router';
import { NgModule } from '@angular/core';

import { SettingsComponent } from './settings/settings.component';
import { GroupSettingsComponent } from './group-settings/group-settings.component';
import { SocialComponent } from './social/social.component';
import { AccountHubComponent } from './account-hub.component';

const routes: Routes = [
    {
        path: 'account-hub',
        component: AccountHubComponent,
        children: [
            { path: '', component: SettingsComponent, data: { title: 'profile-settings'} },
            { path: 'group-settings', component: GroupSettingsComponent, data: { title: 'group-settings'} },
            { path: 'social', component: SocialComponent, data: {title: 'social'}}
        ]
    },
];


@NgModule({
    imports: [ RouterModule.forChild(routes) ],
    exports: [ RouterModule ]
})
export class AccountHubRoutingModule { }