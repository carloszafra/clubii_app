import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { AuthService } from 'src/app/services/auth.service';
import { pubI } from 'src/app/shared/models/publication.interface';
import { FileUploadService } from '../../services/file-upload.service';
import { PublicationService } from '../../services/publication.service';

declare function customInitFunctions();

@Component({
  selector: 'app-newsfeed',
  templateUrl: './newsfeed.component.html',
  styles: [
  ]
})
export class NewsfeedComponent implements OnInit {

  public pubForm;
  public image: any;
  public publication: pubI;
  public token: any;

  constructor( 
    private fileSvc: FileUploadService, 
    private pubSvc: PublicationService, 
    private authSvc: AuthService 
    ) 
    { 
    this.pubForm = new FormGroup({
      content: new FormControl('', Validators.required),
      fileUrl: new FormControl('', Validators.required)
    })
  }

  ngOnInit(): void {
    customInitFunctions();
    this.token = this.authSvc.getToken();
  }

  postPub(value: pubI): void {
    var pub: pubI;
    const prepub = this.pubForm.value;
    pub ={
      content: prepub.content
    }

    if(this.image){
      this.fileSvc.fileUpload(this.image).subscribe(
        response => {
          console.log(response)
          pub.fileUrl = response.secure_url;
          this.uploadPub(pub);
        },
        error => {
          console.log(error)
        }
      )
    }else{
      console.log(`no hay imagen ${value}`)
      this.uploadPub(pub)
    }
  }

  uploadPub(data: pubI): void{
    console.log(data);
    this.pubSvc.uploadPost(data, this.token).subscribe(
      response => {
        console.log(response);
      },
      error => {
        console.log(error)
      }
    )
  }

  handleImage(event: any){
    this.image = event.target.files[0];
    console.log(this.image);
  }

}
