import { Component, OnInit, AfterViewInit, ViewChildren, QueryList } from '@angular/core';
import { ActivatedRoute} from '@angular/router';
import { AuthService } from 'src/app/services/auth.service';
import { PublicationService } from 'src/app/services/publication.service';
import { pubI } from 'src/app/shared/models/publication.interface';

declare function customInitFunctions();

@Component({
  selector: 'app-timeline',
  templateUrl: './timeline.component.html',
  styles: [
  ]
})
export class TimelineComponent implements OnInit, AfterViewInit {

  public token: string;
  public page: number = 1;
  public publications: pubI[];
  public publication: pubI;
  @ViewChildren('userPubs') userPubs: QueryList<any>

  constructor(
    private authSvc: AuthService,
    private pubSvc: PublicationService,
    private _route: ActivatedRoute
  ) { 
    this.token = authSvc.getToken();
  }

  ngOnInit(): void { 
    this.getUserId();
  }

  ngAfterViewInit(): void {
    customInitFunctions();
    this.userPubs.changes.subscribe( t => {
      customInitFunctions();
    })
  }

  async getUserId(): Promise<void>{
   const arr = this._route.snapshot.pathFromRoot[1]
   const userId = arr.params.id;
   await this.getPubs(userId);
    
  }

 async getPubs(userId: string){
   this.pubSvc.getUserPubs(this.token, this.page, userId).subscribe(
     response => {
        console.log(response)
        this.publications = response.publications;
     } ,
     error => {
        console.log(error)
     }
    );
  }

  execScripts(): void{
    customInitFunctions();
  }

}
