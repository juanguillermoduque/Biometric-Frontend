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
import { HotToastService } from "@ngneat/hot-toast";
import { getStorage, ref, uploadBytesResumable, getDownloadURL } from 'firebase/storage';
import { UsuariosService } from "src/app/usuarios/usuarios.service";
import Swal from "sweetalert2";

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
  user = this.decode.data[0];

  constructor(private router:Router, private dialog: MatDialog,
     private rolService:RolesService, private authService:AuthService, 
     private imageUploadService: ImageUploadService, private toast: HotToastService,
     private usuariosService:UsuariosService)
  
  {}

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

  validateFile(event: any):any
   {
    const file: File = event.target.files[0];
    
    if (file) {
      const allowedExtensions = ['image/jpeg', 'image/png'];
      if (!allowedExtensions.includes(file.type)) {
        return false;
      }
      return true;
    }
  }

  uploadImage(event: any, user: User) {

    if(this.validateFile(event)){
      const storage = getStorage();
      const path = `images/profile/${user.uid}`;
      const storageRef = ref(storage, path);
      const uploadTask = uploadBytesResumable(storageRef, event.target.files[0]);
      
      uploadTask.on('state_changed', 
      (snapshot) => {
        // Puedes usar 'snapshot' para monitorizar el progreso de la carga
      }, 
      (error) => {
        Swal.fire({
          position: 'center',
          icon: 'error',
          title: 'Ocurrio un error al subir la foto',
          showConfirmButton: true,
        })
      }, 
      () => {
        getDownloadURL(storageRef).then(downloadURL => {
          this.user.photoURL = downloadURL;
          Swal.fire({
            position: 'center',
            icon: 'success',
            title: 'La Foto fue agregada exitosamente',
            showConfirmButton: true,
          });
          location.reload();
          this.usuariosService.updateUsuario(this.user.num_id,this.user).subscribe(
            ()=>{
  
            }
          )
        });
      }
    );
    }

  }

}
