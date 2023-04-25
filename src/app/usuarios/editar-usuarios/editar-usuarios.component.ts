import { Component, Inject, OnInit } from '@angular/core'; /*importación del componente OnInit*/
import { MAT_DIALOG_DATA } from '@angular/material/dialog'; // importación MAT_DIALOG
import { usuario } from 'src/app/models/usuarios'; /*importación del modelo usuarios trayendo la interfaz usuario*/
import { UsuariosService } from 'src/app/services/usuarios/usuarios.service';  /* importación del servicio UsuariosService que hace una conexión con el backend*/


@Component({/* es un decorador que se utiliza para configurar las propiedades del componente "editar-usuario"*/
  selector: 'app-editar-usuarios', /* es una cadena de texto que se utiliza para identificar y usar el componente en las plantillas HTML de la aplicación */
  templateUrl: './editar-usuarios.component.html', // especifica las rutas de los archivos de hojas de estilo CSS asociados con el componente
  styleUrls: ['./editar-usuarios.component.css'] // especifica las rutas de los archivos de hojas de estilo CSS asociados con el componente
})
export class EditarUsuariosComponent implements OnInit{

  usuario : usuario = { // definición de variable usuario que esta inicializada con un objeto que sigue la estructura de la interfaz usuario
    num_id:0,
    first_name:'',
    last_name:'',
    type_id: '',
    email:'',
    rol :'',
    estado: '',
    password: '',
    biometric_date: '',
    created_at: '',
    updated_at: '',
};

constructor(private usuariosService:UsuariosService, // creación de constructor invocando el servicio de usuariosService que me trae información del backend
  @Inject(MAT_DIALOG_DATA) public num_id:number){ // MAT_DIALOG hace como un token para inyectar datos al parámetro num_id

}
  ngOnInit(){// el ngOnInit se ejecuta cuando se inicializa el componente
    // se realiza el llamado al servicio usuariosService para obtener datos de los usuarios
    if(this.num_id){
      this.usuariosService.getUsuario(this.num_id)
        .subscribe( // utilizado para subscribirse a un flujo de eventos y recibir notificaciones de cuando ocurra un cambio
          res=>{ // si la respuesta por parte del servidor es exitosa se imprime la respuesta
            this.usuario = res;
            console.log(res);
          },
          err => console.error(err) // de lo contrario saldrá un error
        )
    }
  }
  modificarUsuario(){ // Método que me modificará al usuario
    delete this.usuario.created_at;
    delete this.usuario.updated_at; // al usar el método excusa el valor de estos campos se eliminará
    delete this.usuario.biometric_date;
    console.log(this.usuario);

    this.usuariosService.updateUsuario(this.num_id,this.usuario)
    
      .subscribe(// utilizado para subscribirse a un flujo de eventos y recibir notificaciones de cuando ocurra un cambio
      // este método se utiliza para suscribirse a un Observable, el cual puede recibirme la respuesta del servidor
        res =>{
          console.log(res); // si la respuesta por parte del servidor es exitosa se imprime la respuesta
        },
        err => console.error(err) // de lo contrario saldrá un error
      )
  }

}

