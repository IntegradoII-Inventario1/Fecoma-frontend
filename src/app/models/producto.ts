import { Categoria } from "./categoria";
import { Proveedor } from "./proveedor";

export class Producto {
  id:number;
  nombre:string;
  descripcion:string;
  costo:number=0.0;
  cantidad:number=1;
  proveedor:Proveedor
  categoria:Categoria
}
