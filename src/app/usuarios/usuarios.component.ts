import { Component, OnInit } from '@angular/core';
import { UsuariosService } from '../services/usuarios/usuarios.service';
import { usuario } from '../models/usuarios';
import {MatDialog, MatDialogRef} from '@angular/material/dialog';
import { AgregarUsuarioComponent } from './agregar-usuario/agregar-usuario.component';
import { EditarUsuariosComponent } from './editar-usuarios/editar-usuarios.component';

@Component({
  selector: 'app-usuarios',
  templateUrl: './usuarios.component.html',
  styleUrls: ['./usuarios.component.css']
})
export class UsuariosComponent implements OnInit  {
  displayedColumns: string[] = ['NombreUsuario', 'TipoDocumento', 'NumeroDocumento', 'CorreoElectronico','RolSistema','edit'];
  usuarios:any = [];
  dataSource = this.usuarios;
  
  constructor(private usuarioService: UsuariosService, public dialog:MatDialog){
    
  }

  ngOnInit(){
    this.usuarioService.getUsuarios().subscribe(
      res =>{
        this.usuarios = res;
        console.log(this.usuarios);
      },
      err=>console.error(err)
    )
  }

  nuevoUsuario(){
    this.dialog.open(AgregarUsuarioComponent,{
      width:'1000px',
      height: '1000px',
    })
  }

  editarUsuarios(num_id : number){
    this.dialog.open(EditarUsuariosComponent,{
      height:'800px',
      width: '600px',
      data: num_id
    });
  }
}
