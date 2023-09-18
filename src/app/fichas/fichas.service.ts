import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { ficha } from './fichas';
import { Observable, Subject, tap } from 'rxjs';
import { API_DOMAIN } from '../globals';
import { FormControl } from '@angular/forms';

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
    return this.http.post(`${this.API_URI}/fichas/`, ficha);
  }

  updateFicha(id:number,ficha:ficha):Observable<ficha>{
    return this.http.put(`${this.API_URI}/fichas/editar${id}`, ficha).pipe(
      tap(() => this._refresh$.next())
    );
  }

  search(fichasId:String){
    return this.http.get(`${this.API_URI}/filtros/searchFicha${fichasId}`);
  }

  vincularAprendiz(vinculacion:object){
    return this.http.post(`${this.API_URI}/fichas/vincular/aprendiz`, vinculacion)
  }

  desvincularAprendiz(vinculacion:object){
    const httpOptions = {
      headers: new HttpHeaders({
        'Content-Type': 'application/json'
      }),
      body: vinculacion
    };
    return this.http.delete(`${this.API_URI}/fichas/desvincular/aprendiz`, httpOptions);
  }

  vincularInstructor(vinculacion:object){
    return this.http.post(`${this.API_URI}/fichas/vincular/instructor`, vinculacion)
  }

  desvincularInstructor(vinculacion:object){
    const httpOptions = {
      headers: new HttpHeaders({
        'Content-Type': 'application/json'
      }),
      body: vinculacion
    };
    return this.http.delete(`${this.API_URI}/fichas/desvincular/instructor`, httpOptions);
  }
  
  getFichaAprendiz(fichaId:number){
    return this.http.get(`${this.API_URI}/aprendiz/aprendices${fichaId}`)
  }

  getFichaInstructor(fichaId:number){
    return this.http.get(`${this.API_URI}/instructor/instructor${fichaId}`)
  }

  getFichasInstructor(idInstructor:number){
    return this.http.get(`${this.API_URI}/instructor/fichainstructor${idInstructor}`)
  }
  
}
