import { Component } from '@angular/core';
import { Router } from '@angular/router';
import jwtDecode from 'jwt-decode';
import { MatDialog } from '@angular/material/dialog';
import { PerfilComponent } from '../../../usuarios/componentes/perfil/perfil.component';

@Component({
  selector: 'app-main-page',
  templateUrl: './main-page.component.html',
  styleUrls: ['./main-page.component.css']
})
export class MainPageComponent {
  activaOpcion : Number = 0;
  componentes = []
  activarComponenteById:Number = 0;
  nombreUser:string = ""

  constructor(private router:Router, private dialog: MatDialog){}

  ngOnInit(): void {
    this.activaOpcion = 0
    let tok:any = localStorage.getItem('token')
    let decode:any = jwtDecode(tok);
    this.nombreUser =  decode.data[0].email;

  }

  

  AccionAdmin(num:number){
    this.activaOpcion = num;
  }

  logOut(){
    localStorage.removeItem('token');
    this.router.navigate(['/auth']);
  }

  activarComponente(idComponente:Number){
    this.activarComponenteById = idComponente
  }

  mostrarperfil(){ // Método nuevoUsuario que me muestra una ventana emergente con el componente AgregarUsuario
    this.dialog.open(PerfilComponent,{
      width:'600px',
      height: '475px',
    });
  }


}
