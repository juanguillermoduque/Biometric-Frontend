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

/*
Este es un servicio de Angular que se encarga de realizar operaciones con la API REST de asistencias.

el código crea una clase AsistenciasService que tiene un atributo API_URI que indica la ruta base para las peticiones
a la API REST.

El constructor de la clase recibe una instancia de HttpClient, que es una clase de Angular que se encarga de realizar peticiones
HTTP.

La clase tiene cuatro métodos: getAsistencias(), getAsistencia(id:number), saveAsistencia(asistenci:asistencia), y
updateAsistencia(id:number,asistenci:asistencia):Observable<asistencia> que realizan diferentes tipos de peticiones a la API REST
de asistencias.*/
