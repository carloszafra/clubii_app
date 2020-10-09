import { Component, OnInit, AfterContentInit } from '@angular/core';


declare function customInitFunctions();

@Component({
  selector: 'app-profile',
  templateUrl: './profile.component.html',
  styles: [
  ]
})
export class ProfileComponent implements OnInit, AfterContentInit {

 

  constructor( 
    
  ) { }
  ngAfterContentInit(): void {
    
  }

  ngOnInit(): void {
    customInitFunctions();
   
  }

}
