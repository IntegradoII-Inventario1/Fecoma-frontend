import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { LoginComponent } from './auth/login/login.component';
import { RegisterComponent } from './auth/register/register.component';
import { NopagefoundComponent } from './pages/nopagefound/nopagefound.component';
import { DashboardComponent } from './pages/dashboard/dashboard.component';
import { SidebarComponent } from './components/sidebar/sidebar.component';
import { ComprasComponent } from './pages/compras/compras.component';
import { ChartComponent } from './components/chart/chart.component';
import { NavbarComponent } from './components/navbar/navbar.component';
import { ObjToArrayPipe } from './pipes/obj-to-array.pipe';
import { ClientesComponent } from './pages/clientes/clientes.component';
import { FontAwesomeModule } from '@fortawesome/angular-fontawesome';
import { ClockComponent } from './components/clock/clock.component';
import { DespachosComponent } from './pages/despachos/despachos.component';
import { SideAdminComponent } from './components/side-admin/side-admin.component';
import { AdminComponent } from './pages/admin/admin.component';
import {HttpClientModule} from '@angular/common/http'
import { FormsModule } from '@angular/forms';
import { PaginatorComponent } from './components/paginator/paginator.component';
import { ModalComprasComponent } from './components/modal-compras/modal-compras.component';
import { ProveedoresComponent } from './pages/proveedores/proveedores.component';
import { RepresentantesModalComponent } from './components/representantes-modal/representantes-modal.component';
import { PaginatorProveedoresComponent } from './components/paginator-proveedores/paginator-proveedores.component';
import { CategoriaModalComponent } from './components/categoria-modal/categoria-modal.component';

@NgModule({
  declarations: [
    AppComponent,
    LoginComponent,
    RegisterComponent,
    NopagefoundComponent,
    DashboardComponent,
    SidebarComponent,
    ComprasComponent,
    ChartComponent,
    NavbarComponent,
    ObjToArrayPipe,
    ClientesComponent,
    ClockComponent,
    DespachosComponent,
    SideAdminComponent,
    AdminComponent,
    PaginatorComponent,
    ModalComprasComponent,
    ProveedoresComponent,
    RepresentantesModalComponent,
    PaginatorProveedoresComponent,
    CategoriaModalComponent,
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    FontAwesomeModule,
    HttpClientModule,
    FormsModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
