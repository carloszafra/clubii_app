import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
}) 
export class NavBarService {

  menu: any[] = [
    { title: 'Newsfeed', url: '/newsfeed', svgClass: 'menu-item-link-icon icon-newsfeed', xlink: '#svg-newsfeed' },
    { title: 'Overview', url: '/account-hub', svgClass: 'menu-item-link-icon icon-overview', xlink: '#svg-overview' },
    { title: 'Groups', url: '/groups', svgClass: 'menu-item-link-icon icon-group', xlink: '#svg-group' },
    { title: 'Members', url: '/members', svgClass: 'menu-item-link-icon icon-members', xlink: '#svg-members' },
    { title: 'Badges', url: '/badges', svgClass: 'menu-item-link-icon icon-badges', xlink: '#svg-badges' },
    { title: 'Streams', url: '/streams', svgClass: 'menu-item-link-icon icon-streams', xlink: '#svg-streams' },
    { title: 'Events', url: '/events', svgClass: 'menu-item-link-icon icon-events', xlink: '#svg-events' },
  ]

  constructor() { } 
} 
