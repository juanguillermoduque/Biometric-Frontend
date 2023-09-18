import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import {asistencia} from './asistencia';
import { Observable, Subject } from 'rxjs';
import {tap} from 'rxjs/operators'
import { API_DOMAIN } from '../globals';
import { FormControl } from '@angular/forms';

@Injectable({
  providedIn: 'root'
})
export class AsistenciasService {
  API_URI = API_DOMAIN;
  private _refresh$ = new Subject<void>()

  constructor(private http:HttpClient) {}

  get_refresh$(){
    return this._refresh$;
  }

  getAsistencias(){
    return this.http.get(`${this.API_URI}/asistencias/`);
  }
  getAsistenciasAprendiz(id:number){
    return this.http.get(`${this.API_URI}/asistencias/aprendiz${id}`);
  }
  getAsistenciasInstructor(id:number){
    return this.http.get(`${this.API_URI}/asistencias/instructor${id}`);
  }
  getAsistencia(id:number){
    return this.http.get(`${this.API_URI}/asistencias/${id}`);
  }
  saveAsistencia(asistenci: asistencia) {
    return this.http.post(`${this.API_URI}/asistencias/`, asistenci)
      .pipe(
        tap(() => (
          this._refresh$.next()
        ))
      );
  }
  updateAsistencia(id:number,asistenci:asistencia):Observable<asistencia>{
    return this.http.put(`${this.API_URI}/asistencias/editar${id}`,asistenci);
  }

  search(asistenciasId:String){
    return this.http.get(`${this.API_URI}/filtros/searchAsistencia${asistenciasId}`);
  }

  deleteAsistencia(asistenciasId:number){
    return this.http.delete(`${this.API_URI}/asistencias/delete/${asistenciasId}`);
  }
 
}
