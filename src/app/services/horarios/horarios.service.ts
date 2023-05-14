import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { horario } from 'src/app/models/horarios';
import { Observable } from 'rxjs';
import { API_DOMAIN } from 'src/app/models/globals';

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
  saveHorario(horario:horario){
    return this.http.post(`${this.API_URI}/horarios/`,horario);
  }
  updateHorario(id:number,horario:horario):Observable<horario>{
    return this.http.put(`${this.API_URI}/horarios/editar${id}`,horario);
  }

  search(horariosId:String){
    return this.http.get(`${this.API_URI}/filtros/searchHorarios${horariosId}`);
  }
}
