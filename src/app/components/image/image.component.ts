import { Component, OnInit } from '@angular/core';
import { ImageModalService } from '../../services/image-modal.service'

@Component({
  selector: 'app-image',
  templateUrl: './image.component.html',
  styleUrls: ['./image.component.css']
})
export class ImageComponent implements OnInit {

  public hideModal: boolean = false;

  constructor( public modalImgSvc: ImageModalService ) { }

  ngOnInit(): void {
  }

  hide(){
    console.log('click')
    this.modalImgSvc.closeModal()
  }

}
