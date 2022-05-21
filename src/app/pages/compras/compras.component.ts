import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { faPenToSquare, faTrash } from '@fortawesome/free-solid-svg-icons';
import { Subscription, tap } from 'rxjs';
import { Producto } from 'src/app/models/producto';
import { Representante } from 'src/app/models/representante';
import { ModalComprasService } from 'src/app/services/modal-compras.service';
import { ProductoService } from 'src/app/services/producto.service';
import { RepresentantesService } from 'src/app/services/representantes.service';

@Component({
  selector: 'app-compras',
  templateUrl: './compras.component.html',
  styles: [],
})
export class ComprasComponent implements OnInit {
  faPenToSquare = faPenToSquare;
  faTrash = faTrash;
  productos:Producto[] = []
  paginador:any;
  suscription:Subscription
  productoget:Producto

  constructor(
    private productoService: ProductoService,
    private activatedRoute: ActivatedRoute,
    private modalComprasService:ModalComprasService
  ) {}

  ngOnInit() {
    this.suscription = this.productoService.refresh$.subscribe(()=>{
      this.paginations()
      this.paginador
    })
    this.paginations()
  }

  cargarProducto(id):void{
    if(id){
      this.productoService.getProducto(id).subscribe( producto  => {
        this.productoget = producto
        console.log(this.productoget);
      })
    }
    this.abrirModal()
  }

  paginations(){
    this.activatedRoute.paramMap.subscribe((params) => {
      let page: number = +params.get('page');

      if (!page) {
        page = 0;
      }

      this.productoService
        .getProductos(page)
        .pipe(
          tap((response) => {
            (response.content as Producto[]).forEach((producto) => {
              console.log(producto.nombre);
            });
          })
        )
        .subscribe(
          (response) =>{
            this.productos = response.content as Producto[]
            this.paginador = response;
          }
        );
    });
  }

  abrirModal(){
    this.modalComprasService.abrirModal();
  }

  

  
}
