import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { catchError, map, Observable, Subject, tap, throwError } from 'rxjs';
import { environment } from 'src/environments/environment.prod';
import { Producto } from '../models/producto';

@Injectable({
  providedIn: 'root'
})
export class ProductoService {

  private _refresh$ = new Subject<void>();
  urlProducto:string=environment.baserTest+"producto/"
  private httpHeaders = new HttpHeaders({'Content-type':'application/json'})

  constructor(private http:HttpClient) { }

  get refresh$(){
    return this._refresh$;
  }

  create(representate:Producto):Observable<Producto>{
    return this.http.post<Producto>(this.urlProducto+"crear",representate,{headers:this.httpHeaders})
    .pipe(
      map((response:any) => response.content as Producto),
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

  getProductos(page:number):Observable<any>{
    return this.http.get(this.urlProducto+'pagina/'+page).pipe(
      tap((response:any) => {
        (response.content as Producto[]).forEach(representante => {
          console.log(representante);
          
        })
      }),
      map((response:any) => {
        (response.content as Producto[]).map(representante => {
          return representante
        });
        return response
      }),
      tap(response => {
        (response.content as Producto[]).forEach(representante => {
         
          
        })
      })
    );
  }

  getProducto(id):Observable<Producto>{
    return this.http.get<Producto>(`${this.urlProducto}${id}`)
  }
}
