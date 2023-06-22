import { Component } from '@angular/core';
import { AuthService } from '../../auth.service';
import { auth } from '../../auth';
import Swal from 'sweetalert2';
import {  Router } from '@angular/router';
import { HttpErrorResponse } from '@angular/common/http';
import { MatDialog } from '@angular/material/dialog';
import { RecuperarContrasenaComponent } from '../recuperar-contrasena/RecuperarContrasenaComponent';

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
   public dialog: MatDialog, 
  ){}

  logearse() {
    if (this.email == '' || this.contrasena == '') {
      Swal.fire(
        {
          icon: 'error',
          title: 'Oops...',
          text: 'Campos sin completar',
        }
      )
      this.email = '';
      this.contrasena = '';
    } else {
        const data = {
          email : this.email,
          password : this.contrasena
        }
        this.autenticate(data);
    }
  }
  recuperarContrasena(){
    this.dialog.open(RecuperarContrasenaComponent, {
      height: '350px',
      width: '400px',
    });
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
