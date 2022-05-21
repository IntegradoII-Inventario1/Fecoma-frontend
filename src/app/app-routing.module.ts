import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { LoginComponent } from './auth/login/login.component';
import { AdminComponent } from './pages/admin/admin.component';
import { ClientesComponent } from './pages/clientes/clientes.component';
import { ComprasComponent } from './pages/compras/compras.component';
import { DashboardComponent } from './pages/dashboard/dashboard.component';
import { DespachosComponent } from './pages/despachos/despachos.component';
import { NopagefoundComponent } from './pages/nopagefound/nopagefound.component';
import { ProveedoresComponent } from './pages/proveedores/proveedores.component';

const routes: Routes = [
  {path:'login',component:LoginComponent},
  {path:'dashboard',component:DashboardComponent},
  {path:'ingresos',component:ComprasComponent},
  {path:'ingresos/page/:page',component:ComprasComponent},
  {path:'clientes',component:ClientesComponent},
  {path:'despacho',component:DespachosComponent},
  {path:'admin',component:AdminComponent,
    children:[
      {path:'proveedores',component:ProveedoresComponent},
      {path:'proveedores/page/:page',component:ComprasComponent},
    ]
  },
  {path:'',redirectTo:'dashboard',pathMatch:'full'},
  {path:'**',component:NopagefoundComponent}
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})

export class AppRoutingModule { }