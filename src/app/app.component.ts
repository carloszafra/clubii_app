import { Component, OnInit, OnDestroy } from '@angular/core';
import { ScriptsService } from './services/scripts.service';
import { NavigationEnd, NavigationStart, Router} from '@angular/router';
import { filter } from 'rxjs/operators';
import { Observable, Subscription } from 'rxjs';


@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit, OnDestroy{
 

  constructor( private router: Router,
    private scriptSvc: ScriptsService ) { 
   
  }
  ngOnDestroy(): void {
    
  }

  ngOnInit(): void {
    this.scriptSvc.loadScript();
  }

 /* getRouteChange(){
    return this.router.events
    .pipe( filter( event => event instanceof NavigationEnd ));
  }  */
  
  
}
