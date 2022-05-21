import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { catchError, map, Observable, Subject, tap, throwError } from 'rxjs';
import { environment } from 'src/environments/environment.prod';
import { Proveedor } from '../models/proveedor';

@Injectable({
  providedIn: 'root'
})
export class ProveedorService {

  private _refresh$ = new Subject<void>();
  window:boolean = false;

  urlProveedor:string=environment.baserTest+"proveedor/"
  private httpHeaders = new HttpHeaders({'Content-type':'application/json'})

  constructor(private http:HttpClient) { }

  get refresh$(){
    return this._refresh$;
  }

  getProveedores(page:number):Observable<any>{
    return this.http.get(this.urlProveedor+'pagina/'+page).pipe(
      tap((response:any) => {
        (response.content as Proveedor[]).forEach(proveedor => {
          console.log(proveedor);
          this._refresh$.next()
        })
      }),
      map((response:any) => {
        (response.content as Proveedor[]).map(proveedor => {
          return proveedor
        });
        return response
      }),
      tap(response => {
        (response.content as Proveedor[]).forEach(proveedor => {
          console.log(proveedor.nombre);
        })
      })
    );
  }

  create(proveedor:Proveedor):Observable<Proveedor>{
    return this.http.post<Proveedor>(this.urlProveedor+"crear",proveedor,{headers:this.httpHeaders})
    .pipe(
      map((response:any) => response.content as Proveedor),
      catchError(e => {
        if(e.status==400){
          return throwError(e)
        }        
        return throwError(e)
      }),
      tap(()=> {
        this._refresh$.next();
      })
    )
  }

  lista():Observable<Proveedor[]>{
    return this.http.get<Proveedor[]>(this.urlProveedor+"lista");
  }


  abrirWindowProveedor(){
    this.window = true;
  }

  cerrarWindowProveedor(){
    this.window = false;
  }
}
