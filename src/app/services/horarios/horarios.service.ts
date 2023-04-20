import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { horario } from 'src/app/models/horarios';
@Injectable({
  providedIn: 'root'
})
export class HorariosService {
  API_URI = 'http://localhost:3000/api';

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
  updateFicha(id:number,horario:horario):Observable<horario>{
    return this.http.put(`${this.API_URI}/horario/editar${id}`,horario);
  }
}
