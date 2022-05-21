import { Component, OnInit } from '@angular/core';
import { Representante } from 'src/app/models/representante';
import { ModalRepresentantesService } from 'src/app/services/modal-representantes.service';
import { RepresentantesService } from 'src/app/services/representantes.service';
import swal from 'sweetalert2'

@Component({
  selector: 'app-representantes-modal',
  templateUrl: './representantes-modal.component.html',
  styles: [
  ]
})
export class RepresentantesModalComponent implements OnInit {

  public representante:Representante = new Representante()
  public errores:string[]
  
  constructor(private modalRepresentante:ModalRepresentantesService,
    private representanteService:RepresentantesService) { }
 

  ngOnInit(): void {}

  public create():void {
    this.representanteService.create(this.representante).subscribe(
      representante => {
        swal.fire('Representante Creado',`Representante ${this.representante.nombres} creado con exito`,'success')
        this.cerrarWindow()
        representante.nombres=""
        representante.apellidos=""
        representante.correo=""
        representante.telefono=""
      },
      error => {
        this.errores = error.error.error as string[]
        console.log(this.errores);
        console.log("codigo de error "+error.status);
      }
    )
  }

  cerrarWindow(){
    this.modalRepresentante.window=false; 
  }

}
