import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { usuario } from './usuarios';
import { Observable } from 'rxjs';
import { API_DOMAIN } from '../globals';

@Injectable({
  providedIn: 'root'
})
export class UsuariosService {
  API_URI = API_DOMAIN;

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
  searchUsuario(id:String){
    return this.http.get(`${this.API_URI}/filtros/searchUser${id}`,);
  }

  updatePassword(id:number, password:string):Observable<any>{
    const data = { password: password };
    return this.http.put(`${this.API_URI}/usuarios/${id}/password`, data);
  }
}
