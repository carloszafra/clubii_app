import { Component, OnInit } from '@angular/core';
import { ImageModalService } from '../../services/image-modal.service';

@Component({
  selector: 'app-group-settings',
  templateUrl: './group-settings.component.html',
  styles: [
  ]
})
export class GroupSettingsComponent implements OnInit {

  constructor( private modalSvc: ImageModalService) { }

  ngOnInit(): void {
  }

  public openModal(): void {
    this.modalSvc.openModal();
  }

}
