import { Component, OnDestroy, OnInit } from '@angular/core';
import { NavBarService } from '../../services/nav-bar.service'
import { RouterLink} from '@angular/router';
import { Subscription } from 'rxjs';
import { Router, ActivatedRoute, ActivationEnd } from '@angular/router';
import { delay, filter, map } from 'rxjs/operators';
import { AuthService } from '../../services/auth.service';
import { User, userI } from '../models/user.interface';

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
  public user: userI;
  public $img: Subscription;

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
    this.$img = this.authSvc.newImg.subscribe((avatarUrl: string) =>{
      this.user.avatarUrl = avatarUrl;
      console.log(avatarUrl);
    })
  }

  ngOnDestroy(): void {
    this.titleSubs$.unsubscribe();
    this.$img.unsubscribe();
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
