import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { ficha } from 'src/app/models/fichas';
import { Observable } from 'rxjs';
@Injectable({
  providedIn: 'root'
})
export class FichasService {
  API_URI = 'http://localhost:3000/api';

  constructor(private http:HttpClient) {

  }

  getFichas(){
    return this.http.get(`${this.API_URI}/fichas/`);
  }
  getFicha(id:number){
    return this.http.get(`${this.API_URI}/fichas/${id}`);
  }
  saveFicha(ficha:ficha){
    return this.http.post(`${this.API_URI}/fichas/`,ficha);
  }
  updateFicha(id:number,ficha:ficha):Observable<ficha>{
    return this.http.put(`${this.API_URI}/fichas/editar${id}`,ficha);
  }


}
