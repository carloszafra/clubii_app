import { Component, OnDestroy, OnInit } from '@angular/core';
import { NavBarService } from '../../services/nav-bar.service'
import { RouterLink} from '@angular/router';
import { Subscription } from 'rxjs';
import { Router, ActivatedRoute, ActivationEnd } from '@angular/router';
import { filter, map } from 'rxjs/operators';
import { AuthService } from '../../services/auth.service';

@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styles: [
  ]
})
export class NavbarComponent implements OnInit, OnDestroy{ 
  
  public menuItems: any[];
  public title: string;
  public titleSubs$: Subscription;
  public user: any;

  constructor( 
    private router: Router, 
    private route: ActivatedRoute, 
    private navSvc: NavBarService,
    private authSvc: AuthService 
  ) 
  { 
    this.titleSubs$ = this.getRouteParams()
    .subscribe( ({title}) =>{
      this.title = title;
      document.title = `Clubii | ${title}`; 
    });

    this.menuItems = this.navSvc.menu;
    console.log(this.menuItems)
  }


  ngOnInit(): void{
    this.user = this.authSvc.getIdentity();
  }

  ngOnDestroy(): void {
    this.titleSubs$.unsubscribe();
  }


  getRouteParams(){
    return this.router.events
    .pipe(
      filter( event => event instanceof ActivationEnd ),
      filter( (event: ActivationEnd) => event.snapshot.firstChild == null),
      map( (event: ActivationEnd) => event.snapshot.data )
    )
    
  }



}
