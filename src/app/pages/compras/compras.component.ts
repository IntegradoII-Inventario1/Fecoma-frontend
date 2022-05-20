import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { faPenToSquare, faTrash } from '@fortawesome/free-solid-svg-icons';
import { tap } from 'rxjs';
import { Representante } from 'src/app/models/representante';
import { ModalComprasService } from 'src/app/services/modal-compras.service';
import { RepresentantesService } from 'src/app/services/representantes.service';

@Component({
  selector: 'app-compras',
  templateUrl: './compras.component.html',
  styles: [],
})
export class ComprasComponent implements OnInit {
  faPenToSquare = faPenToSquare;
  faTrash = faTrash;
  representantes: Representante[] = [];
  paginador:any;

  constructor(
    private representanteService: RepresentantesService,
    private activatedRoute: ActivatedRoute,
    private modalComprasService:ModalComprasService
  ) {}

  ngOnInit() {
    this.activatedRoute.paramMap.subscribe((params) => {
      let page: number = +params.get('page');

      if (!page) {
        page = 0;
      }

      this.representanteService
        .getRepresentantes(page)
        .pipe(
          tap((response) => {
            (response.content as Representante[]).forEach((representantes) => {
              console.log(representantes.nombres);
            });
          })
        )
        .subscribe(
          (response) =>{
            this.representantes = response.content as Representante[]
            this.paginador = response;
          }
        );
    });
  }

  abrirModal(){
    this.modalComprasService.abrirModal();
  }

  
}
