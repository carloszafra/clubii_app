import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class NavBarService {

  menu: any[] = [
    { title: 'Newsfeed', url: 'newsfeed', svgClass: 'icon-newsfeed', xlink: '#svg-newsfeed' },
    { title: 'Overview', url: 'account-hub', svgClass: 'icon-overview', xlink: '#svg-overview' },
    { title: 'Groups', url: 'groups', svgClass: 'icon-group', xlink: '#svg-group' },
    { title: 'Members', url: 'members', svgClass: 'icon-members', xlink: '#svg-members' },
    { title: 'Badges', url: 'badges', svgClass: 'icon-badges', xlink: '#svg-badges' },
    { title: 'Streams', url: 'streams', svgClass: 'icon-streams', xlink: '#svg-streams' },
    { title: 'Events', url: 'events', svgClass: 'icon-events', xlink: '#svg-events' },
  ]

  constructor() { } 
}
