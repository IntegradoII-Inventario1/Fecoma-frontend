import { Component, OnInit } from '@angular/core';
import { Representante } from 'src/app/models/representante';
import { Proveedor } from 'src/app/models/proveedor';
import { ModalRepresentantesService } from 'src/app/services/modal-representantes.service';
import { RepresentantesService } from 'src/app/services/representantes.service';
import { Subscription, tap } from 'rxjs';
import { ProveedorService } from 'src/app/services/proveedor.service';
import swal from 'sweetalert2'
import { faPenToSquare, faTrash } from '@fortawesome/free-solid-svg-icons';
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-proveedores',
  templateUrl: './proveedores.component.html',
  styles: [
  ]
})
export class ProveedoresComponent implements OnInit {
  faPenToSquare = faPenToSquare;
  faTrash = faTrash;

  representantes:Representante[]
  proveedor:Proveedor = new Proveedor()
  suscription:Subscription
  suscription2:Subscription
  errores=[]
  proveedores:Proveedor[]
  paginadorprov:any;

  constructor(public modalRepresentantes:ModalRepresentantesService,
    public representanteService:RepresentantesService,
    public proveedorService:ProveedorService,
    private activatedRoute: ActivatedRoute,
    ) { }
  

  ngOnInit(): void {
    this.suscription = this.representanteService.refresh$.subscribe(() => {
      this.representanteService.lista().subscribe(representantes => this.representantes = representantes)
    })
    this.suscription2 = this.proveedorService.refresh$.subscribe(()=>{
      this.paginations()
    })


    this.representanteService.lista().subscribe(representantes => this.representantes = representantes)
    this.paginations()
  }

  paginations(){
    this.activatedRoute.paramMap.subscribe((params) => {
      let page: number = +params.get('page');

      if (!page) {
        page = 0;
      }

      this.proveedorService
        .getRepresentantes(page)
        .pipe(
          tap((response) => {
            (response.content as Proveedor[]).forEach((proveedores) => {
              console.log(proveedores.nombre);
            });
          })
        )
        .subscribe(
          (response) =>{
            this.proveedores = response.content as Proveedor[]
            this.paginadorprov = response;
          }
        );
    });
  }

  abrirWindow(){
    this.modalRepresentantes.window = true;
  }
  cerrarWindow(){
    this.modalRepresentantes.window=false; 
  }

  abrirWindowProveedor(){
    this.proveedorService.window = true;
  }
  cerrarWindowProveedor(){
    this.proveedorService.window=false; 
  }

  create(){
    
    this.proveedorService.create(this.proveedor).subscribe(
      proveedor => {
        swal.fire('Proveedor Creado',`Proveedor ${this.proveedor.nombre} creado con exito`,'success')
        this.cerrarWindowProveedor()
        this.proveedor.nombre=""
        this.proveedor.direccion=""
        this.proveedor.ruc=""
        this.proveedor.representante=null
      },
      error => {
        this.errores = error.error.error as string[]
        swal.fire('Error',this.errores[0],'error')
        
      }
    )
  }
}
