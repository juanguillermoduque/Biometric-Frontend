import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { excusa } from './excusas';
import { Observable, Subject } from 'rxjs';
import { tap } from 'rxjs/operators';
import { API_DOMAIN } from '../globals';

@Injectable({
  providedIn: 'root'
})
export class ExcusasService {
  API_URI = API_DOMAIN;
  private _refresh$ = new Subject<void>();

  constructor(private http: HttpClient) {

  }

  get_refresh$(){
    return this._refresh$;
  }

  getExcusas(){
    return this.http.get(`${this.API_URI}/excusas/`);
  }
  getExcusasAprendiz(id:number){
    return this.http.get(`${this.API_URI}/excusas/aprendiz${id}`);
  }
  getExcusa(id:number){
    return this.http.get(`${this.API_URI}/excusas/${id}`);
  }
  saveexcusa(excusa:excusa){
    return this.http.post(`${this.API_URI}/excusas/`,excusa)
      .pipe(
        tap(() => (
          this._refresh$.next()
        ))
      );
  }
  updateexcusa(id:number,excusa:excusa):Observable<excusa>{
    return this.http.put(`${this.API_URI}/excusas/editar${id}`,excusa);
  }

  search(excusasId:string){
    return this.http.get(`${this.API_URI}/filtros/searchExcusa${excusasId}`);
  }

  sendPost(body:FormData):Observable<any>{
    return this.http.post(`${this.API_URI}/excusas/upload`, body)
  }
  
  downloadPDF(filename: string): Observable<Blob> {
    return this.http.get(`${this.API_URI}/excusas/public?filename=${filename}`, { responseType: 'blob' });
  }
  
}
