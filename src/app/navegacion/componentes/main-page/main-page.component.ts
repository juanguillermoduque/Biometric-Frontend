import {  NgZone } from "@angular/core";
import { Component } from '@angular/core';
import { Router } from '@angular/router';
import jwtDecode from 'jwt-decode';
import { MatDialog } from '@angular/material/dialog';
import { RolesService } from '../../../roles/roles.service';
import { PerfilComponent } from '../../../usuarios/componentes/perfil/perfil.component';
import {rol} from 'src/app/roles/roles'
import { AuthService } from "src/app/auth/auth.service";
import { ImageUploadService } from "../services/image-upload.service";
import { User } from "@angular/fire/auth";
import { concatMap } from "rxjs";

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

  tok:any = localStorage.getItem('token')
  decode:any = jwtDecode(this.tok);
  user$ = this.decode.data[0];

  constructor(private router:Router, private dialog: MatDialog,
     private rolService:RolesService, private authService:AuthService, 
     private imageUploadService: ImageUploadService//, private toast: HotToastService)
  )
  {}

  ngOnInit(): void {
    console.log(this.user$);
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

  //INICIO

  /*
  uploadImage(event: any, user: User) {
    this.imageUploadService
      .uploadImage(event.target.files[0], `images/profile/${user.uid}`)
      .pipe(
        this.toast.observe({
          loading: 'Uploading profile image...',
          success: 'Image uploaded successfully',
          error: 'There was an error in uploading the image',
        }),
        concatMap((photoURL) => this.authService.updateProfileData({ photoURL }))
      ).subscribe();
  }*/

  //FINAL


}
