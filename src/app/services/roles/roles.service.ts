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



  getRol(name:string){
    return this.http.get(`${this.API_URI}/roles/${name}`);
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
  
  getrolComponent(id:number){
    return this.http.get(`${this.API_URI}/roles/componentes_roles${id}`);
  }

  saveRolComponent(rol:componenteRol){
    return this.http.post(`${this.API_URI}/roles/componentes_roles`, rol).pipe(
      tap(() => this._refresh$.next())
    );
  }

  updateRolComponent(id:number,rol:rol):Observable<any>{
    return this.http.put(`${this.API_URI}/roles/componentes_roles/editar${id}`, rol).pipe(
      tap(() => this._refresh$.next())
    );
  }

  getComponentes(){
    return this.http.get(`${this.API_URI}/componentes`);
  }

  getRoles(){
    return this.http.get(`${this.API_URI}/roles/`);
  }

}
