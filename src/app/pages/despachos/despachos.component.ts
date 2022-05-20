import { Component, OnInit } from '@angular/core';
import { faPenToSquare, faTrash } from '@fortawesome/free-solid-svg-icons';

@Component({
  selector: 'app-despachos',
  templateUrl: './despachos.component.html',
  styles: [
  ]
})
export class DespachosComponent implements OnInit {

  faPenToSquare = faPenToSquare
  faTrash = faTrash

  constructor() { }

  ngOnInit(): void {
  }

}
