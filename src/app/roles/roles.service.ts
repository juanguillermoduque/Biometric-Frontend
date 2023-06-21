import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { rol } from './roles';
import { Observable, Subject, tap } from 'rxjs';
import { componenteRol } from './component-rol';
import { API_DOMAIN } from '../globals';


@Injectable({
  providedIn: 'root'
})
export class RolesService {

  API_URI = API_DOMAIN;
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
    return this.http.get(`${this.API_URI}/roles/rol${id_rol}`);
  }

  saveRol(rol:rol){
    return this.http.post(`${this.API_URI}/roles/`, rol).pipe(
      tap(() => this._refresh$.next())
    );
  }

  getRolByIdUser(idUser:Number){
    return this.http.get(`${this.API_URI}/roles/usuario/${idUser}`);
  }

  updateRol(id:number,rol:rol):Observable<any>{
    return this.http.put(`${this.API_URI}/roles/editar${id}`, rol).pipe(
      tap(() => this._refresh$.next())
    );
  }

  searchRoles(query:string){
    return this.http.get(`${this.API_URI}/filtros/searchRol${query}`);
  }
  

  //services usuarios Roles
  getUsuarioRol(idUser:any){
    return this.http.get(`${this.API_URI}/usuario_rol/${idUser}`);
  }

  saveUsuarioRol(ids:any){
    return this.http.post(`${this.API_URI}/usuario_rol/`,ids);
  }

  searchInstructores(){
    return this.http.get(`${this.API_URI}/instructor/instructor`);
  }

  createFichaInstructor(ids:any){
    return this.http.post(`${this.API_URI}/instructor/fichainstructor`, ids);
  }

  getAprendices(){
    return this.http.get(`${this.API_URI}/aprendiz/`);
  }

  //services de Get rol componente
  
  getrolComponent(id:Number){
    return this.http.get(`${this.API_URI}/componentes/componentes_roles${id}`);
  }

  saveRolComponent(rol:componenteRol){
    return this.http.post(`${this.API_URI}/componentes/componentes_roles`, rol).pipe(
      tap(() => this._refresh$.next())
    );
  }

  updateRolComponent(id:number,rol:componenteRol):Observable<any>{
    return this.http.put(`${this.API_URI}/componentes/componentes_roles/editar${id}`, rol).pipe(
      tap(() => this._refresh$.next())
    );
  }
  deleteComponentesRol(idRol:number):Observable<any>{
    return this.http.delete(`${this.API_URI}/componentes/componentes_roles/delete${idRol}`);
  }

  //component services

  getComponentes(){
    return this.http.get(`${this.API_URI}/componentes/`);
  }
  getComponente(id:Number){
    return this.http.get(`${this.API_URI}/componentes/${id}`);
  }
  getComponentesByRol(id:Number){
    return this.http.get(`${this.API_URI}/componentes/componentes_by_rol${id}`);
    
  }








  

}
