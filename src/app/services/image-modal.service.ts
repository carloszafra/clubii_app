import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class ImageModalService {

  private _hideModal: boolean = true;

  constructor() { }

  get hideModal(){
    return this._hideModal;
  }

  openModal(){
    console.log('le dio click')
    this._hideModal = false;
  }

  closeModal(){
    this._hideModal = true;
  }
}
