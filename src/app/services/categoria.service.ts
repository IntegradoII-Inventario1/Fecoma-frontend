import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { catchError, map, Observable, Subject, tap, throwError } from 'rxjs';
import { environment } from 'src/environments/environment.prod';
import { Categoria } from '../models/categoria';

@Injectable({
  providedIn: 'root'
})
export class CategoriaService {

  modalcategoria:boolean = false;
  private _refresh$ = new Subject<void>();
  urlCategoria:string=environment.baserTest+"categoria/"
  private httpHeaders = new HttpHeaders({'Content-type':'application/json'})

  constructor(private http:HttpClient) { }

  get refresh$(){
    return this._refresh$;
  }


  create(representate:Categoria):Observable<Categoria>{
    return this.http.post<Categoria>(this.urlCategoria+"crear",representate,{headers:this.httpHeaders})
    .pipe(
      map((response:any) => response.content as Categoria),
      catchError(e => {
        console.log(e);
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

  abrirModalCategoria(){
    this.modalcategoria = true;
  }

  cerrarModalCategoria(){
    this.modalcategoria = false;
  }

  lista():Observable<Categoria[]>{
    return this.http.get<Categoria[]>(this.urlCategoria+"list")
  }
}
