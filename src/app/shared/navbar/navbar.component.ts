import { Component, OnDestroy } from '@angular/core';
import { NavBarService } from '../../services/nav-bar.service'
import { RouterLink} from '@angular/router';
import { Subscription } from 'rxjs';
import { Router, ActivatedRoute, ActivationEnd } from '@angular/router';
import { filter, map } from 'rxjs/operators';

@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styles: [
  ]
})
export class NavbarComponent implements OnDestroy{ 
  
  public menuItems: any[];
  public title: string;
  public titleSubs$: Subscription;

  constructor( 
    private router: Router, 
    private route: ActivatedRoute,
    private navSvc: NavBarService 
  ) 
  { 
    this.titleSubs$ = this.getRouteParams()
    .subscribe( ({title}) =>{
      this.title = title;
      document.title = `Clubii | ${title}`;
    });

    this.menuItems = this.navSvc.menu;    
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
