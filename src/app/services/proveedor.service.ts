import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { map, Observable, Subject, tap } from 'rxjs';
import { environment } from 'src/environments/environment.prod';
import { Proveedor } from '../models/proveedor';

@Injectable({
  providedIn: 'root'
})
export class ProveedorService {

  private _refresh$ = new Subject<void>();
  window:boolean = false;


  urlRepresentante:string=environment.baserTest+"proveedor/"
  private httpHeaders = new HttpHeaders({'Content-type':'application/json'})

  constructor(private http:HttpClient) { }

  get refresh$(){
    return this._refresh$;
  }

  getRepresentantes(page:number):Observable<any>{
    return this.http.get(this.urlRepresentante+'pagina/'+page).pipe(
      tap((response:any) => {
        (response.content as Proveedor[]).forEach(representante => {
          console.log(representante);
        })
      }),
      map((response:any) => {
        (response.content as Proveedor[]).map(representante => {
          return representante
        });
        return response
      }),
      tap(response => {
        (response.content as Proveedor[]).forEach(representante => {
          console.log(representante.nombre);
        })
      })
    );
  }

  create(representate:Proveedor):Observable<Proveedor>{
    return this.http.post<Proveedor>(this.urlRepresentante+"crear",representate,{headers:this.httpHeaders})
    .pipe(
      tap(()=> {
        this._refresh$.next();
      })
    )
  }

  lista():Observable<Proveedor[]>{
    return this.http.get<Proveedor[]>(this.urlRepresentante+"lista");
  }


  abrirWindowProveedor(){
    this.window = true;
  }

  cerrarWindowProveedor(){
    this.window = false;
  }
}
