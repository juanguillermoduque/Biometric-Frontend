import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import {Programa} from './programas';
import { API_DOMAIN } from 'src/app/globals';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class ProgramasService {
  API_URI = API_DOMAIN;

  constructor(private http:HttpClient) { 
  }

  getProgramas(){
      return this.http.get(`${this.API_URI}/programas/`);
  }
  getPrograma(id:number){
      return this.http.get(`${this.API_URI}/programas/${id}`);
    
  }

  savePrograma(programa:Programa){
    return this.http.post(`${this.API_URI}/programas/`,programa);
  }
  updatePrograma(id:number,programa:Programa):Observable<Programa>{
    return this.http.put(`${this.API_URI}/programas/editar${id}`,programa);
  }

  search(id:String){
    return this.http.get(`${this.API_URI}/filtros/searchProgramas${id}`);
  }
}

