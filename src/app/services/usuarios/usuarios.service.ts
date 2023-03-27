import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { usuario } from 'src/app/models/usuarios';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class UsuariosService {
  API_URI = 'http://localhost:3000/api';

  constructor(private http:HttpClient) { 
     
  }

  getUsuarios(){
    return this.http.get(`${this.API_URI}/usuarios/`);
  }
  getUsuario(id:number){
    return this.http.get(`${this.API_URI}/usuarios/${id}`);
  }
  saveUsuario(usuario:usuario){
    return this.http.post(`${this.API_URI}/usuarios/`,usuario);
  }
  updateUsuario(id:number,usuario:usuario):Observable<usuario>{
    return this.http.put(`${this.API_URI}/usuarios/editar${id}`,usuario);
  }
}