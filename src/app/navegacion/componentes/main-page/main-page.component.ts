import {  NgZone } from "@angular/core";
import { Component } from '@angular/core';
import { Router } from '@angular/router';
import jwtDecode from 'jwt-decode';
import { MatDialog } from '@angular/material/dialog';
import { RolesService } from '../../../roles/roles.service';
import { PerfilComponent } from '../../../usuarios/componentes/perfil/perfil.component';
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

  mediaMatcherWidth: MediaQueryList = matchMedia(`(max-width:1000px)`);
  mediaMatcherHeight: MediaQueryList = matchMedia(`(max-height:900px)`);


  constructor(private router:Router, private dialog: MatDialog,
     private rolService:RolesService,
     zone:NgZone)
  {
    this.mediaMatcherWidth.addListener(mql =>
      zone.run(() => this.mediaMatcherWidth = matchMedia(`(max-width: 1000px)`)));

    this.mediaMatcherHeight.addListener(mql =>
      zone.run(() => this.mediaMatcherHeight = matchMedia(`(max-height: 900px)`)));
  }

  ngOnInit(): void {
    this.getRol();
  }

  getRol(){
    this.activaOpcion = 0
    let tok:any = localStorage.getItem('token')
    let decode:any = jwtDecode(tok);
    let idUser = decode.data[0].num_id;

    this.rolService.getRolByIdUser(idUser).subscribe(
      (data:any)=>{
        let aux:rol = data;
        this.usuario_rol = aux.nombre_rol;
        console.log(data)
      }
    )
  }

  getnombre(){
    this.activaOpcion = 0
    let tok:any = localStorage.getItem('token')
    let decode:any = jwtDecode(tok);
    let nombreUsuario = decode.data[0].first_name + " " + decode.data[0].last_name;
    return nombreUsuario;
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

  EsPantallaGrande(){
    if(this.mediaMatcherWidth.matches || this.mediaMatcherHeight.matches){
      return false;
    }
    else{
      return true;
    }
  }
}
