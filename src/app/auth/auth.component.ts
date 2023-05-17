import { Component } from '@angular/core';
import { AuthService } from '../services/auth/auth.service';
import { auth } from '../models/auth';
import Swal from 'sweetalert2';
import {  Router } from '@angular/router';
import { HttpErrorResponse } from '@angular/common/http';

@Component({
  selector: 'app-auth',
  templateUrl: './auth.component.html',
  styleUrls: ['./auth.component.css']
})
export class AuthComponent {
  email: string = '';
  contrasena: string = '';

  constructor(
   private authServise:AuthService,
   private router:Router,
  ){}

  logearse() {
    if (this.email == '' || this.contrasena == '') {
      Swal.fire(
        {
          icon: 'error',
          title: 'Oops...',
          text: 'Campos Sin Completar',
        }
      )
      this.email = '';
      this.contrasena = '';
    } else {
        this.email = this.email?.toLowerCase()
        const data = {
          email : this.email,
          password : this.contrasena
        }
        this.autenticate(data);
    }
  }
  
  autenticate(data:auth){
    this.authServise.validateAuth(data).subscribe({
      next : (token:any)=>{
        this.router.navigate(['/index']);
        localStorage.setItem('token',token)
      },
      error : (e:HttpErrorResponse) =>{
        if(e.error.msg){
          Swal.fire({
            icon: 'error',
            title: 'Oops...',
            text: e.error.msg,
          })
        }else{
          Swal.fire({
            icon: 'error',
            title: 'Oops...',
            text: 'Ocurrio un error inesperado',
          })
        }
      }
    })
  }
}
