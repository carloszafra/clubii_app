import { Component, OnInit } from '@angular/core';
import { RouterLink} from '@angular/router';

@Component({
  selector: 'app-hub-sidebar',
  templateUrl: './hub-sidebar.component.html',
  styles: [
  ]
})
export class HubSidebarComponent implements OnInit {

  menu: any[] = [
    {
      title: 'My profile',
      text: ''
    }
  ]

  
  constructor() { }

  ngOnInit(): void {
  }

}
