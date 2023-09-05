import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { auth } from './auth';
import { API_DOMAIN } from '../globals';
import { UserInfo, updateProfile } from '@angular/fire/auth';
import { Observable, concatMap, of } from 'rxjs';

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

  //INICIO

  /*updateProfileData(profileData: Partial<UserInfo>): Observable<any> {

    const user = this.auth.currentUser;
    return of(user).pipe(
      concatMap((user) => {
      if (!user) throw new Error('Not authenticated');

      return updateProfile(user, profileData);
      })
    );
  }*/

  //FINAL


}
 //este archivo está realizando la conexión entre back y fronted