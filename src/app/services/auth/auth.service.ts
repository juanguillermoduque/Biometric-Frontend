import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { competencia } from 'src/app/models/competencias';
import { Observable } from 'rxjs';
import { auth } from 'src/app/models/auth';
import { API_DOMAIN } from 'src/app/models/globals';

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  API_URI = API_DOMAIN;
  constructor(private http:HttpClient) { }

  validateAuth(auth:auth){
    return this.http.post(`${this.API_URI}/login/`,auth);
  }
}
 //este archivo está realizando la conexión entre back y fronted