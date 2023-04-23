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
/*
Este código es un servicio de Angular que se encarga de hacer peticiones HTTP a una API en el backend. El servicio es para manejar
la entidad "usuario", y tiene los métodos getUsuarios() para obtener todos los usuarios, getUsuario(id) para obtener un usuario en
 particular, saveUsuario(usuario) para guardar un nuevo usuario y updateUsuario(id,usuario) para actualizar un usuario existente
 mediante su ID. Se utiliza la librería HttpClient para hacer las peticiones HTTP a la API.
*/
