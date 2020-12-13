import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-group-manage',
  templateUrl: './group-manage.component.html',
  styles: [
  ]
})
export class GroupManageComponent implements OnInit {

  constructor(
    private activatedRoute: ActivatedRoute
  ) { }

  ngOnInit(): void {
    this.activatedRoute.params.subscribe( ({id}) => {

    })
  }

  loadGroup(id: string){

  }

}
