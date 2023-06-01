
import { UsuariosService } from '../../usuarios.service'; /* importación del servicio UsuariosService que hace una conexión con el backend*/
import { usuario } from '../../usuarios'; /*importación del modelo usuarios trayendo la interfaz usuario*/
import { Component, OnInit } from '@angular/core';  /*importación del componente OnInit*/
import { rol } from '../../../roles/roles';
import { RolesService } from '../../../roles/roles.service';
import { usuario_rol } from '../../../roles/usuario_rol';
import Swal from 'sweetalert2'

@Component({/* es un decorador que se utiliza para configurar las propiedades del componente "agregar-usuario"*/
  selector: 'app-agregar-usuario', /* es una cadena de texto que se utiliza para identificar y usar el componente en las plantillas HTML de la aplicación */
  templateUrl: './agregar-usuario.component.html', // especifica las rutas de los archivos de hojas de estilo CSS asociados con el componente
  styleUrls: ['./agregar-usuario.component.css'] // especifica las rutas de los archivos de hojas de estilo CSS asociados con el componente
})
export class AgregarUsuarioComponent implements OnInit { // llamado de componente AgregarUsuario implementando la interfaz OnInit
  
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
    estado: '',
    password: '',
    biometric_date: '',
    created_at: '',
    updated_at: '',
};
constructor(private usuariosService:UsuariosService,
  private rolService:RolesService){ // creación de constructor invocando el servicio de usuariosService que me trae información del backend

}
  ngOnInit(){ // Este método se utiliza para realizar tareas de inicialización en el componente, como la obtención de datos iniciales o la configuración de alguna variable
    this.rolService.getRoles().subscribe(
    (res)=>{
      this.roles = res;
      console.log(this.roles);
    }
    )
  }

  guardarUsuario(){ // Método que me guardará un Usuario
    delete this.usuario.created_at;
    delete this.usuario.updated_at; // al usar el método usuario el valor de estos campos se eliminará
    delete this.usuario.biometric_date;

      if (this.usuario.num_id == 0 || this.usuario.first_name == '' || this.usuario.last_name == '' || this.usuario.type_id == ''
      || this.usuario.email == '' || this.usuario.estado == '' || this.usuario.password == '' || this.rolSeleccionado.id_rol == 0) {
        
        Swal.fire(
          {
            icon: 'error',
            title: 'Oops...',
            text: 'Hay campos sin completar',
          }
        )
        this.usuario.num_id = 0;
        this.usuario.first_name = '';
        this.usuario.last_name = '';
        this.usuario.type_id = '';
        this.usuario.email = '';
        this.usuario.estado = '';
        this.usuario.password = '';
        this.rolSeleccionado.id_rol = 0;
        this.rolSeleccionado.nombre_rol = '';
      }
      else{
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
              showConfirmButton: false,
              timer: 1500
            })
            console.log(res); // si la respuesta por parte del servidor es exitosa se imprime la respuesta
          },
          err => console.error(err) // de lo contrario saldrá un error
      )
      }
  }

  agregarRol(rol:any){
      this.rolSeleccionado.nombre_rol = rol.nombre_rol;
      this.rolSeleccionado.id_rol = rol.id_rol;
      console.log(this.rolSeleccionado);
      
  }

  asignarRol(){
    let ids:usuario_rol = {
      id_usuario:this.usuario.num_id,
      id_rol:this.rolSeleccionado.id_rol
    };
    console.log(ids);

    this.rolService.saveUsuarioRol(ids).subscribe(
      (res)=>{
        console.log(res);
      },(err)=>{
        console.error(err);
      }
    )
  }

}