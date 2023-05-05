import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { ficha } from 'src/app/models/fichas';
import { Observable, Subject, tap } from 'rxjs';
import { API_DOMAIN } from 'src/app/models/globals';

@Injectable({
  providedIn: 'root'
})
export class FichasService {
  API_URI = API_DOMAIN;
  private _refresh$ = new Subject<void>()

  constructor(private http: HttpClient) {}

  get refresh$(){
    return this._refresh$
  }



  getFichas(){
    return this.http.get(`${this.API_URI}/fichas/`);
  }
  getFicha(id:number){
    return this.http.get(`${this.API_URI}/fichas/${id}`);
  }
  saveFicha(ficha:ficha){
    return this.http.post(`${this.API_URI}/fichas/`, ficha).pipe(
      tap(() => this._refresh$.next())
    );
  }
  updateFicha(id:number,ficha:ficha):Observable<ficha>{
    return this.http.put(`${this.API_URI}/fichas/editar${id}`, ficha).pipe(
      tap(() => this._refresh$.next())
    );
  }

  search(fichasId:String){
    return this.http.get(`${this.API_URI}/filtros/search${fichasId}`);
  }


}
