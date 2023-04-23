import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { ficha } from 'src/app/models/fichas';
import { Observable, Subject, tap } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class FichasService {
  API_URI = 'http://localhost:3000/api';
  private _refresh$ = new Subject<void>()

  constructor(private http: HttpClient) {}

  get refresh$(){
    return this._refresh$
  }

  getFichas(){
    return this.http.get(`${this.API_URI}/fichas/`);
  }
  getFicha(id:number){
    return this.http.get(`${this.API_URI}/fichas/${id}`);
  }
  saveFicha(ficha:ficha){
    return this.http.post(`${this.API_URI}/fichas/`, ficha).pipe(
      tap(() => this._refresh$.next())
    );
  }
  updateFicha(id:number,ficha:ficha):Observable<ficha>{
    return this.http.put(`${this.API_URI}/fichas/editar${id}`, ficha).pipe(
      tap(() => this._refresh$.next())
    );
  }
}

/*
Este código define un servicio Angular llamado FichasService que se utiliza para interactuar con un servidor API RESTful que
maneja datos de fichas. La clase contiene métodos que realizan solicitudes HTTP GET, POST y PUT para obtener, agregar y actualizar
 datos de fichas en el servidor. También se define un Observable llamado _refresh$ que se emite cada vez que se guarda o actualiza
 una ficha. Esto se hace usando la tubería "tap" de RxJS para llamar a la función next() del sujeto _refresh$ cada vez que se
 realiza una solicitud POST o PUT.
*/
