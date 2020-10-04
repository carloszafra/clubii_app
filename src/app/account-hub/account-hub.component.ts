import { Component, OnInit, OnDestroy } from '@angular/core';
import { NavigationEnd, Router } from '@angular/router';
import { Subscription } from 'rxjs';
import { filter } from 'rxjs/operators';
import { ScriptsService } from '../services/scripts.service';



@Component({
  selector: 'app-account-hub',
  templateUrl: './account-hub.component.html',
  styles: [
  ]
})
export class AccountHubComponent implements OnInit {
  
  ngOnInit():void {
    
  } 
}
