import { Component } from '@angular/core';
import { Router } from '@angular/router';
import jwtDecode from 'jwt-decode';
import { MatDialog } from '@angular/material/dialog';
import { UsuariosService } from '../../../usuarios/usuarios.service';
import { RolesService } from '../../../roles/roles.service';
import { PerfilComponent } from '../../../usuarios/componentes/perfil/perfil.component';
import { usuario_rol } from 'src/app/roles/usuario_rol';
import {rol} from 'src/app/roles/roles'

@Component({
  selector: 'app-main-page',
  templateUrl: './main-page.component.html',
  styleUrls: ['./main-page.component.css']
})
export class MainPageComponent {
  activaOpcion : Number = 0;
  componentes = []
  activarComponenteById:Number = 0;
  usuario_rol:string ="";


  constructor(private router:Router, private dialog: MatDialog,
    private usuarioService: UsuariosService, private rolService:RolesService){

  }

  ngOnInit(): void {
    this.getRol()
  }

  getRol(){
    this.activaOpcion = 0
    let tok:any = localStorage.getItem('token')
    let decode:any = jwtDecode(tok);
    console.log(decode.data[0])
    let idUser = decode.data[0].num_id;
    this.rolService.getUsuarioRol(idUser).subscribe(
      (data:any)=>{
        let usuarioRol:usuario_rol = data;
        let idRol = usuarioRol.id_rol;
        this.rolService.getRolId(idRol).subscribe(
          (rol:any) =>{
            let aux:rol = rol;
            console.log(aux)
            this.usuario_rol = aux.nombre_rol;
          }
        )
      }
    )
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
