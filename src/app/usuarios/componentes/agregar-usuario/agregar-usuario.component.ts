
import { UsuariosService } from '../../usuarios.service'; /* importación del servicio UsuariosService que hace una conexión con el backend*/
import { usuario } from '../../usuarios'; /*importación del modelo usuarios trayendo la interfaz usuario*/
import { Component, OnInit } from '@angular/core';  /*importación del componente OnInit*/
import { rol } from '../../../roles/roles';
import { RolesService } from '../../../roles/roles.service';
import { usuario_rol } from '../../../roles/usuario_rol';
import Swal from 'sweetalert2'
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MatDialogRef } from '@angular/material/dialog';

@Component({/* es un decorador que se utiliza para configurar las propiedades del componente "agregar-usuario"*/
  selector: 'app-agregar-usuario', /* es una cadena de texto que se utiliza para identificar y usar el componente en las plantillas HTML de la aplicación */
  templateUrl: './agregar-usuario.component.html', // especifica las rutas de los archivos de hojas de estilo CSS asociados con el componente
  styleUrls: ['./agregar-usuario.component.css'] // especifica las rutas de los archivos de hojas de estilo CSS asociados con el componente
})
export class AgregarUsuarioComponent implements OnInit { // llamado de componente AgregarUsuario implementando la interfaz OnInit
  
  form: FormGroup;

  rolSeleccionado:rol ={
    id_rol : 0,
    nombre_rol : ''
  };

  roles:any = []

  usuario : usuario = { // definición de variable usuario que esta inicializada con un objeto que sigue la estructura de la interfaz usuario
    num_id:0,
    first_name:'',
    last_name:'',
    type_id: '',
    email:'',
    password: '',
    biometric_date: 0,
    created_at: '',
    updated_at: '',
};
constructor(private usuariosService:UsuariosService,
  private rolService:RolesService,
  private fb: FormBuilder,
  public dialogRef: MatDialogRef<AgregarUsuarioComponent>){ // creación de constructor invocando el servicio de usuariosService que me trae información del backend

}
  ngOnInit(){ // Este método se utiliza para realizar tareas de inicialización en el componente, como la obtención de datos iniciales o la configuración de alguna variable
    this.rolService.getRoles().subscribe(
    (res)=>{
      this.roles = res;

    }
    )

    this.form = this.fb.group({
      numberInput: [
        '', 
        [Validators.required, Validators.min(1), Validators.max(127)]
      ]
    });
  }

  guardarUsuario(){ // Método que me guardará un Usuario
    delete this.usuario.created_at;
    delete this.usuario.updated_at; // al usar el método usuario el valor de estos campos se eliminará

      if (this.usuario.num_id == 0 || this.usuario.first_name == '' || this.usuario.last_name == '' || this.usuario.type_id == ''
      || this.usuario.email == '' || this.usuario.password == '' || this.rolSeleccionado.id_rol == 0) {
        
        Swal.fire(
          {
            icon: 'error',
            title: 'Oops...',
            text: 'Hay campos sin completar',
          }
        )
      }
      else{
        if(this.rolSeleccionado.nombre_rol == 'APRENDIZ' || this.rolSeleccionado.nombre_rol == 'APRENDIZ - INSTRUCTOR'){
          if(this.usuario.biometric_date != undefined){
            if((this.usuario.biometric_date > 0) && (this.usuario.biometric_date < 128)){
              this.usuario.first_name = this.usuario.first_name?.toLowerCase()
              this.usuario.last_name = this.usuario.last_name?.toLowerCase()
              this.usuario.email = this.usuario.email?.toLowerCase()
              this.usuariosService.saveUsuario(this.usuario) // el Método saveUsuario del servicio usuariosService se llama pasandole como argumento el objeto this.usuario
              .subscribe( // utilizado para subscribirse a un flujo de eventos y recibir notificaciones de cuando ocurra un cambio
            // este método se utiliza para suscribirse a un Observable, el cual puede recibirme la respuesta del servidor
                res =>{
                  this.asignarRol();
                  Swal.fire({
                    position: 'center',
                    icon: 'success',
                    title: 'El usuario fue agregado exitosamente',
                    showConfirmButton: true,
                  }).then((result) => {
                    if (result.isConfirmed) {
                      this.dialogRef.close();
                    } 
                  });
              
                },
                  err => console.error(
                    Swal.fire({
                      position: 'center',
                      icon: 'error',
                      title: err,
                      showConfirmButton: true,
                    }).then((result) => {
                      if (result.isConfirmed) {
                        this.dialogRef.close();
                      } 
                    })
                  ) 
                )
              }
            }
        }else{
          this.usuario.first_name = this.usuario.first_name?.toLowerCase()
          this.usuario.last_name = this.usuario.last_name?.toLowerCase()
          this.usuario.email = this.usuario.email?.toLowerCase()
          this.usuariosService.saveUsuario(this.usuario) // el Método saveUsuario del servicio usuariosService se llama pasandole como argumento el objeto this.usuario
          .subscribe( // utilizado para subscribirse a un flujo de eventos y recibir notificaciones de cuando ocurra un cambio
        // este método se utiliza para suscribirse a un Observable, el cual puede recibirme la respuesta del servidor
            res =>{
              this.asignarRol();
              Swal.fire({
                position: 'center',
                icon: 'success',
                title: 'El usuario fue agregado exitosamente',
                showConfirmButton: true,
              }).then((result) => {
                if (result.isConfirmed) {
                  this.dialogRef.close();
                } 
              });
          
            },
            err => console.error(err) // de lo contrario saldrá un error
        )
          }
      }
  }

  agregarRol(rol:any){
      this.rolSeleccionado.nombre_rol = rol.nombre_rol;
      this.rolSeleccionado.id_rol = rol.id_rol;

      
  }

  asignarRol(){
    let ids:usuario_rol = {
      id_usuario:this.usuario.num_id,
      id_rol:this.rolSeleccionado.id_rol
    };


    this.rolService.saveUsuarioRol(ids).subscribe(
      (res)=>{

      },(err)=>{
        console.error(err);
      }
    )
  }

  get numberInput() {
    return this.form.get('numberInput');
  }

}