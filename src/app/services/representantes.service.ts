import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, Subject,catchError, throwError, pipe } from 'rxjs';
import { Representante } from '../models/representante';
import {map,tap} from 'rxjs/operators'
import { environment } from 'src/environments/environment.prod';
import swal from 'sweetalert2'


@Injectable({
  providedIn: 'root'
})
export class RepresentantesService {

  private _refresh$ = new Subject<void>();

  urlRepresentante:string=environment.baserTest+"representante/"
  private httpHeaders = new HttpHeaders({'Content-type':'application/json'})
  
  
  constructor(private http:HttpClient) { }

  get refresh$(){
    return this._refresh$;
  }

  getRepresentantes(page:number):Observable<any>{
    return this.http.get(this.urlRepresentante+'pagina/'+page).pipe(
      tap((response:any) => {
        (response.content as Representante[]).forEach(representante => {
          console.log(representante);
          
        })
      }),
      map((response:any) => {
        (response.content as Representante[]).map(representante => {
          return representante
        });
        return response
      }),
      tap(response => {
        (response.content as Representante[]).forEach(representante => {
          console.log(representante.nombres);
          
        })
      })
    );
  }

  create(representate:Representante):Observable<Representante>{
    return this.http.post<Representante>(this.urlRepresentante+"crear",representate,{headers:this.httpHeaders})
    .pipe(
      map((response:any) => response.content as Representante),
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

  lista():Observable<Representante[]>{
    return this.http.get<Representante[]>(this.urlRepresentante+"list")

  }
}
