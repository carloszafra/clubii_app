import { Component, OnInit } from '@angular/core';
import { RouterLink } from '@angular/router';

@Component({
  selector: 'app-hub-sidebar',
  templateUrl: './hub-sidebar.component.html',
  styles: [
  ]
})
export class HubSidebarComponent implements OnInit {

  public menu: any[] = [
    {
      title: 'My profile',
      text: 'Change your avatar &amp; cover, accept friends, read messages and more!',
      icon: 'sidebar-menu-header-icon icon-profile',
      xlink: '#svg-profile',
      submenu: [
        { link: 'info', title: 'Profile Info' },
        { link: 'social', title: 'Social &amp; Stream' },
        { link: 'notifications', title: 'Notifications' },
        { link: 'messages', title: 'Messages' },
        { link: 'friend-requests', title: 'Friend Requests' },
      ]
    },
    {
      title: 'Account',
      text: 'Change settings, configure notifications, and review your privacy',
      icon: 'sidebar-menu-header-icon icon-settings',
      xlink: '#svg-settings',
      submenu: [
        { link: '#', title: 'Account Info' },
        { link: '#', title: 'Change Password' },
        { link: '#', title: 'General Settings' }
      ]
    },
    {
      title: 'Groups',
      text: 'Create new groups, manage the ones you created or accept invites!',
      icon: 'sidebar-menu-header-icon icon-group',
      xlink: '#svg-group',
      submenu: [
        { link: 'group-settings', title: 'Manage Groups' },
        { link: '#', title: 'Invitations' }
      ]
    },
    {
      title: 'My Store',
      text: 'Review your account, manage products check stats and much more!',
      icon: 'sidebar-menu-header-icon icon-store',
      xlink: '#svg-store',
      submenu: [
        { link: 'group-settings', title: 'My Account' },
        { link: '#', title: 'Sales Statement' }
      ]
    }
  ]


  constructor() {

  }

  ngOnInit(): void {
    console.log(this.menu)
  }

}
