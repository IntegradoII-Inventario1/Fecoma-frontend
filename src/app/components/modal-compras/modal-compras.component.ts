import { Component, Input, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Subscription } from 'rxjs';
import { Categoria } from 'src/app/models/categoria';
import { Producto } from 'src/app/models/producto';
import { Proveedor } from 'src/app/models/proveedor';
import { CategoriaService } from 'src/app/services/categoria.service';
import { ModalComprasService } from 'src/app/services/modal-compras.service';
import { ProductoService } from 'src/app/services/producto.service';
import { ProveedorService } from 'src/app/services/proveedor.service';
import swal from 'sweetalert2'

@Component({
  selector: 'app-modal-compras',
  templateUrl: './modal-compras.component.html',
  styles: [
  ]
})
export class ModalComprasComponent implements OnInit {

  suscription:Subscription
  suscription2:Subscription
  proveedores:Proveedor[]
  categorias:Categoria[]
  producto:Producto = new Producto()
  errores:string[]
  @Input() productoget:Producto;

  constructor(public modalComprasService:ModalComprasService,
    private productoService:ProductoService,
    private proveedorService:ProveedorService,
    public categoriaService:CategoriaService,
    public activeRouter:ActivatedRoute
    ) { }

  ngOnInit(): void {
    this.suscription = this.proveedorService.refresh$.subscribe(() => {
      this.proveedorService.lista().subscribe(proveedores => this.proveedores = proveedores)
    })
    this.suscription2 = this.categoriaService.refresh$.subscribe(()=>{
      this.categoriaService.lista().subscribe(categorias => this.categorias = categorias)
    })
    this.proveedorService.lista().subscribe(proveedores => this.proveedores = proveedores)
    this.categoriaService.lista().subscribe(categorias => this.categorias = categorias)
  }

  cerrarModal(){
    this.modalComprasService.cerrarModal()
    this.cerrarModalCategorial()
    this.producto.nombre=""
    this.producto.cantidad=1
    this.producto.costo=0.0
    this.producto.descripcion=""
    this.producto.categoria
    this.producto.proveedor
  }

  create(){
    this.productoService.create(this.producto).subscribe(
      producto => {
        swal.fire('Producto Creado',`Producto ${this.producto.nombre} creado con exito`,'success')
        this.cerrarModal()
        producto.nombre=""
        producto.costo=0.0
        producto.descripcion=""
        producto.cantidad=1
      },
      error => {
        this.errores = error.error.error as string[]
        console.log(this.errores);
        console.log("codigo de error "+error.status);
      }
    )
  }


  abrirModalCategoria(){
    this.categoriaService.modalcategoria=true;
    console.log(this.categoriaService.modalcategoria);
    
  }
  
  cerrarModalCategorial(){
    this.categoriaService.modalcategoria=false;
  }


}
