import { Component, OnInit, AfterViewInit, ViewChildren, QueryList } from '@angular/core';
import { Observable } from 'rxjs';
import { pubI } from 'src/app/shared/models/publication.interface';
import { AuthService } from '../../services/auth.service';
import { PublicationService } from '../../services/publication.service';

declare function customInitFunctions();

@Component({
  selector: 'app-newsfeed-timeline',
  templateUrl: './newsfeed-timeline.component.html',
  styles: [
  ]
})
export class NewsfeedTimelineComponent implements OnInit, AfterViewInit {

  public token: any;
  public page: number = 1;
  public $publications: Observable<pubI[]>;
  public publication: pubI
  public publications: pubI[];
  @ViewChildren('itemPubs') itemPubs: QueryList<any>

  constructor(
    private authSvc: AuthService,
    private pubSvc: PublicationService
  ) 
  {
    this.token = this.authSvc.getToken(); 
  }

 async ngOnInit(): Promise<void> {
    await this.getPublications();
    
  }
  ngAfterViewInit(): void{
    customInitFunctions();
    this.itemPubs.changes.subscribe(t =>{
      this.execScripts();
    }) 
  }


  async getPublications(){
    this.pubSvc.getNewsfeedPubs(this.token, this.page).subscribe(
      response => {
        this.publications = response
      },
      error => {
        console.log(error)
      }
    )
      
  }

  execScripts(){
    
    customInitFunctions();
  }

}
