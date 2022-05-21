import { Component, OnInit } from '@angular/core';
import { Categoria } from 'src/app/models/categoria';
import { CategoriaService } from 'src/app/services/categoria.service';
import swal from 'sweetalert2'

@Component({
  selector: 'app-categoria-modal',
  templateUrl: './categoria-modal.component.html',
  styles: [
  ]
})
export class CategoriaModalComponent implements OnInit {

  public categoria:Categoria = new Categoria()
  errores:string[]

  constructor(public categoriaService:CategoriaService) { }

  ngOnInit(): void {
  }

  cerrarModalCategoria(){
    this.categoriaService.modalcategoria=false
    this.categoria.nombre=""
    this.categoria.descripcion=""
  }

  public create():void {
    this.categoriaService.create(this.categoria).subscribe(
      representante => {
        swal.fire('Categoria Creada',`Categoria ${this.categoria.nombre} creado con exito`,'success')
        representante.nombre=""
        representante.descripcion=""
      },
      error => {
        this.errores = error.error.error as string[]
        console.log(this.errores);
        console.log("codigo de error "+error.status);
      }
    )
    this.cerrarModalCategoria()
  }

  

}
