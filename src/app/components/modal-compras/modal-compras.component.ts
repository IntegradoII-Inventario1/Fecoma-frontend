import { Component, OnInit } from '@angular/core';
import { ModalComprasService } from 'src/app/services/modal-compras.service';

@Component({
  selector: 'app-modal-compras',
  templateUrl: './modal-compras.component.html',
  styles: [
  ]
})
export class ModalComprasComponent implements OnInit {

  constructor(public modalComprasService:ModalComprasService) { }

  ngOnInit(): void {
  }

  cerrarModal(){
    this.modalComprasService.cerrarModal()
  }


}
