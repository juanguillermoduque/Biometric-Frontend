import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { horario } from './horarios';
import { Observable } from 'rxjs';
import { API_DOMAIN } from '../globals';

@Injectable({
  providedIn: 'root'
})
export class HorariosService {
  API_URI = API_DOMAIN;

  constructor(private http:HttpClient) {

  }

  getHorarios(){
    return this.http.get(`${this.API_URI}/horarios/`);
  }
  getHorario(id:number){
    return this.http.get(`${this.API_URI}/horarios/${id}`);
  }
  saveHorario(horario:horario,fichaInstructor:any){
    return this.http.post(`${this.API_URI}/horarios/`,{horario,fichaInstructor});
  }
  updateHorario(id:number,horario:horario):Observable<horario>{
    return this.http.put(`${this.API_URI}/horarios/editar${id}`,horario);
  }

  search(horariosId:string){
    return this.http.get(`${this.API_URI}/filtros/searchHorario${horariosId}`);
  }

}
