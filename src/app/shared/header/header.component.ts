import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styles: [
  ]
})
export class HeaderComponent implements OnInit {

  constructor( private router: Router ) { }

  ngOnInit(): void {
    
  }


  logout(): void {
    localStorage.clear();
    window.location.replace('/landing');
  }
}
