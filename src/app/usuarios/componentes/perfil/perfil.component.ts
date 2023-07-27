import { Component, OnInit } from '@angular/core';
import jwtDecode from 'jwt-decode';
import { MatDialog } from '@angular/material/dialog';
import { CambiarContrasenaComponent } from '../cambiar-contrasena/cambiar-contrasena.component';

@Component({
  selector: 'app-perfil',
  templateUrl: './perfil.component.html',
  styleUrls: ['./perfil.component.css']
})
export class PerfilComponent implements OnInit {

  type_id: string = '';
  num_id: number = 0;
  first_name: string = '';
  last_name: string = '';
  email: string = '';

  constructor(public dialog:MatDialog,
    
  ) { }

  ngOnInit(): void {
    this.getInformacionUsuario();
  }

  getInformacionUsuario(){
    let tok:any = localStorage.getItem('token')
    let decode:any = jwtDecode(tok);

    this.type_id = decode.data[0].type_id;
    this.num_id = decode.data[0].num_id;
    this.first_name = decode.data[0].first_name;
    this.last_name= decode.data[0].last_name;
    this.email = decode.data[0].email;
  }

  cambiarContrasena(){
    this.dialog.open(CambiarContrasenaComponent,{
      height: '550px',
      width: '600px',
    })
  }
 

}
