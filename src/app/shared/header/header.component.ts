import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { AuthService } from '../../services/auth.service';



@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styles: [
  ]
})
export class HeaderComponent implements OnInit {

  public user: any;

  constructor(
    private router: Router,
    private authSvc: AuthService
  ) {
    this.user = this.authSvc.getIdentity();
  }

  ngOnInit(): void {
    
    
  }

  

  logout(): void {
    localStorage.clear();
    window.location.replace('/landing');
  }
}
