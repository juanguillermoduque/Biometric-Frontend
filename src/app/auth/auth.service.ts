import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { auth } from './auth';
import { API_DOMAIN } from '../globals';
import { UserInfo, updateProfile } from '@angular/fire/auth';
import { Observable, concatMap, of } from 'rxjs';
import jwtDecode from 'jwt-decode';

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  API_URI = API_DOMAIN;
  constructor(private http:HttpClient) { }

  validateAuth(auth:auth){
    return this.http.post(`${this.API_URI}/login/`,auth);
  }

  recoveryPassword(id:number){
    return this.http.get(`${this.API_URI}/usuarios/recuperarcontrasena${id}`);
  }

}
 //este archivo está realizando la conexión entre back y fronted