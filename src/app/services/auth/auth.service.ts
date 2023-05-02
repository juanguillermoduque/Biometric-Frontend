import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { competencia } from 'src/app/models/competencias';
import { Observable } from 'rxjs';
import { auth } from 'src/app/models/auth';

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  API_URI = 'http://localhost:3000/api';
  constructor(private http:HttpClient) { }

  validateAuth(auth:auth){
    return this.http.post(`${this.API_URI}/login/`,auth);
  }
}
 //este archivo está realizando la conexión entre back y fronted