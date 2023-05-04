import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { rol } from 'src/app/models/roles';
import { Observable, Subject, tap } from 'rxjs';
import { componenteRol } from 'src/app/models/component-rol';


@Injectable({
  providedIn: 'root'
})
export class RolesService {

  API_URI = 'http://localhost:3000/api';
  private _refresh$ = new Subject<void>()
  constructor(private http: HttpClient) {}

  get refresh$(){
    return this._refresh$
  }

  //Services Roles
  getRol(name:string){
    return this.http.get(`${this.API_URI}/roles/${name}`);
  }

  getRoles(){
    return this.http.get(`${this.API_URI}/roles/`);
  }

  getRolId(id_rol:Number){
    return this.http.get(`${this.API_URI}/roles/id${id_rol}`);
  }

  saveRol(rol:rol){
    return this.http.post(`${this.API_URI}/roles/`, rol).pipe(
      tap(() => this._refresh$.next())
    );
  }

  updateRol(id:number,rol:rol):Observable<any>{
    return this.http.put(`${this.API_URI}/roles/editar${id}`, rol).pipe(
      tap(() => this._refresh$.next())
    );
  }

  //services usuarios Roles
  getUsuarioRol(idUser:any){
    return this.http.get(`${this.API_URI}/usuario_rol/${idUser}`);
  }

  saveUsuarioRol(ids:any){
    return this.http.post(`${this.API_URI}/usuario_rol/`,ids);
  }

  //serivices de Get rol componente
  
  getrolComponent(id:Number){
    return this.http.get(`${this.API_URI}/componentes/componentes_roles${id}`);
  }

  saveRolComponent(rol:componenteRol){
    return this.http.post(`${this.API_URI}/componentes/componentes_roles`, rol).pipe(
      tap(() => this._refresh$.next())
    );
  }

  updateRolComponent(id:number,rol:rol):Observable<any>{
    return this.http.put(`${this.API_URI}/componentes/componentes_roles/editar${id}`, rol).pipe(
      tap(() => this._refresh$.next())
    );
  }

  //component services

  getComponentes(){
    return this.http.get(`${this.API_URI}/componentes/`);
  }
  getComponente(id:Number){
    return this.http.get(`${this.API_URI}/componentes/${id}`);
  }






  

}
