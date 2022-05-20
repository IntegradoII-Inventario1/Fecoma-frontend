import { Component, OnInit } from '@angular/core';
import { Cliente } from 'src/app/models/cliente';

@Component({
  selector: 'app-clientes',
  templateUrl: './clientes.component.html',
  styleUrls: []
})
export class ClientesComponent implements OnInit {

  clientes: Cliente[] = [
    {
      id:1,
      nombre:"juanito",
      apellido:"saenz",
      email:"juanito@gmail.com",
      createAt:"12-04_2021"
    },
    {
      id:2,
      nombre:"anacleto",
      apellido:"lucachenco",
      email:"anacleto@gmail.com",
      createAt:"01-06_2021"
    },
    {
      id:2,
      nombre:"panchita",
      apellido:"gil",
      email:"gilpancha@gmail.com",
      createAt:"24-07_2022"
    },
  ];

  constructor() { }

  ngOnInit(): void {
  }

}
