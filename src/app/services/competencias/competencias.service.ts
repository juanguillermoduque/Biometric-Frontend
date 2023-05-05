import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { competencia } from 'src/app/models/competencias';
import { Observable, Subject } from 'rxjs';
import {tap, toArray} from 'rxjs/operators'
import { API_DOMAIN } from 'src/app/models/globals';

@Injectable({
  providedIn: 'root'
})

export class CompetenciasService {
  API_URI = API_DOMAIN;
  private _refresh$ = new Subject<void>()
  constructor(private http:HttpClient) { }

  get_refresh$(){
    return this._refresh$;
  }

  getCompetencias(){
    return this.http.get(`${this.API_URI}/competencias/`);
  }
  getCompetencia(id:number){
    return this.http.get(`${this.API_URI}/competencias/${id}`);
  }

  saveCompetencia(competencia:competencia){
    return this.http.post(`${this.API_URI}/competencias/`,competencia)
    .pipe(
      tap(() => (
        this._refresh$.next()
      ))
    );
  }
  updateCompetencia(id:number,competencia:competencia):Observable<competencia>{
    return this.http.put(`${this.API_URI}/competencias/editar${id}`,competencia);
  }
}
 //este archivo está realizando la conexión entre back y fronted
