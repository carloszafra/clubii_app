import { Component, OnInit, OnDestroy } from '@angular/core';
import { Subscription } from 'rxjs';
import { NavigationEnd, Router } from '@angular/router';
import { filter } from 'rxjs/operators';

declare function customInitFunctions();

@Component({
  selector: 'app-landing',
  templateUrl: './landing.component.html',
  styles: [
  ]
})
export class LandingComponent implements OnInit {
  
 ngOnInit(): void{
   customInitFunctions();
 }
  

}
