import { Component, OnInit, AfterViewInit } from '@angular/core';

declare function customInitFunctions();

@Component({
  selector: 'app-account-hub',
  templateUrl: './account-hub.component.html',
  styles: [
  ]
})
export class AccountHubComponent implements OnInit, AfterViewInit {
  
  ngOnInit():void {
    //customInitFunctions();
  } 

  ngAfterViewInit():void{
    customInitFunctions();
  }
}
