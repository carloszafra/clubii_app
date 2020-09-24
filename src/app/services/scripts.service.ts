import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class ScriptsService {

  constructor() { }

  loadScript(): void {
    this.loadExternalScripts('./assets/js/utils/app.js').then( ()=> {}).catch((err)=> console.log(err));
  }


  private loadExternalScripts(scriptUrl: string){
    return new Promise( resolve =>{  
      const scriptElement = document.createElement('script');
      scriptElement.src = scriptUrl;
      scriptElement.onload = resolve;
      document.body.appendChild(scriptElement);
    })
  }
}
