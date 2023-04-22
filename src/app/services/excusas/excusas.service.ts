import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { excusa } from 'src/app/models/excusas';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class ExcusasService {
  API_URI = 'http://localhost:3000/api';

  constructor(private http:HttpClient) { 

  }

  getexcusas(){
    return this.http.get(`${this.API_URI}/excusas/`);
  }
  getexcusa(id:number){
    return this.http.get(`${this.API_URI}/excusas/${id}`);
  }
  saveexcusa(excusa:excusa){
    return this.http.post(`${this.API_URI}/excusas/`,excusa);
  }
  updateexcusa(id:number,excusa:excusa):Observable<excusa>{
    return this.http.put(`${this.API_URI}/excusas/editar${id}`,excusa);
  }
}
