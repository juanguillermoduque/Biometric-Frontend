import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import {asistencia} from 'src/app/models/asistencia';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class AsistenciasService {
  API_URI = 'http://localhost:3000/api';

  constructor(private http:HttpClient) { 
     
  }

  getAsistencias(){
    return this.http.get(`${this.API_URI}/asistencias/`);
  }
  getAsistencia(id:number){
    return this.http.get(`${this.API_URI}/asistencias/${id}`);
  }
  saveAsistencia(asistenci:asistencia){
    return this.http.post(`${this.API_URI}/asistencias/`,asistenci);
  }
  updateAsistencia(id:number,asistenci:asistencia):Observable<asistencia>{
    return this.http.put(`${this.API_URI}/asistencias/editar${id}`,asistenci);
  }
}