import { Component, OnInit } from '@angular/core';
import { faTruck,faHome,faShoppingCart,faChartLine, faUserGear, faStore } from '@fortawesome/free-solid-svg-icons';

@Component({
  selector: 'app-sidebar',
  templateUrl: './sidebar.component.html',
  styles: [
  ]
})
export class SidebarComponent implements OnInit {


    storeIcon = faStore


 
    menuIcon = [
      {
        title : "dashbord",
        icon : faChartLine,
        ruta: "/dashboard"
      },
      {
        title : "ingresos",
        icon : faTruck,
        ruta: "/ingresos"
      },
      {
        title : "ventas",
        icon : faShoppingCart,
        ruta: "/despacho"
      },
      {
        title : "settings",
        icon : faUserGear,
        ruta: "/admin"
      },
    ]

  
  constructor() { }

  ngOnInit(): void {
    
  }

}
