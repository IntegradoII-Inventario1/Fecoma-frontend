import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class ModalRepresentantesService {

  window:boolean = false;

  constructor() { }

  abrirModal(){
    this.window = true;
  }

  cerrarModal(){
    this.window = false;
  }
}
