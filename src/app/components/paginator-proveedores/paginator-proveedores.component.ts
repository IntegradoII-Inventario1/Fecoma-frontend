import { Component, Input, OnInit } from '@angular/core';

@Component({
  selector: 'app-paginator-proveedores',
  templateUrl: './paginator-proveedores.component.html',
  styles: [
  ]
})
export class PaginatorProveedoresComponent implements OnInit {

  @Input() paginadorprov:any;
  paginas:number[];
  

  constructor() { }

  ngOnInit(): void {
    this.paginas = new Array(this.paginadorprov.totalPages).fill(0).map((_valor,indice) => indice+1);
  }

}
