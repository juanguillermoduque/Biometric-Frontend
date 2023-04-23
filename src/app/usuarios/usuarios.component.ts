import { Component, OnInit } from '@angular/core';
import { UsuariosService } from '../services/usuarios/usuarios.service';
import { usuario } from '../models/usuarios';
import {MatDialog, MatDialogRef} from '@angular/material/dialog';
import { AgregarUsuarioComponent } from './agregar-usuario/agregar-usuario.component';

@Component({
  selector: 'app-usuarios',
  templateUrl: './usuarios.component.html',
  styleUrls: ['./usuarios.component.css']
})
export class UsuariosComponent implements OnInit  {
  displayedColumns: string[] = ['NombreUsuario', 'TipoDocumento', 'NumeroDocumento', 'CorreoElectronico',  'NumeroFicha', 'Telefono','RolSistema','edit'];
  usuarios:any = [];
  dataSource = this.usuarios;

  constructor(private usuarioService: UsuariosService, public dialog:MatDialog){

  }

  ngOnInit(){
    this.actualizarUsuarios();
  }

  nuevoUsuario(){
    const dialogRef = this.dialog.open(AgregarUsuarioComponent,{
      width:'1000px',
      height: '1000px',
    });
    dialogRef.afterClosed().subscribe(result => {
      this.actualizarUsuarios();
    });
  }

  actualizarUsuarios(){
    this.usuarioService.getUsuarios().subscribe(
      res =>{
        this.usuarios = res;
        this.dataSource = this.usuarios;
        console.log(this.usuarios);
      },
      err=>console.error(err)
    );
  }
}
/*
Este código importa varios módulos y clases para utilizarlos en un componente de Angular llamado UsuariosComponent. El componente
llama a un servicio llamado UsuariosService para obtener información de usuarios y luego utiliza esta información para mostrar una
 tabla de usuarios en la vista. También tiene una función para agregar un nuevo usuario a través de un diálogo y una función para
  actualizar la lista de usuarios.*/
