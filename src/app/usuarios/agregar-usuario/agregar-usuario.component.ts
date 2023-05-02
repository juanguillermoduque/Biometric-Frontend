
import { UsuariosService } from 'src/app/services/usuarios/usuarios.service'; /* importación del servicio UsuariosService que hace una conexión con el backend*/
import { usuario } from 'src/app/models/usuarios'; /*importación del modelo usuarios trayendo la interfaz usuario*/
import { Component, OnInit } from '@angular/core';  /*importación del componente OnInit*/

@Component({/* es un decorador que se utiliza para configurar las propiedades del componente "agregar-usuario"*/
  selector: 'app-agregar-usuario', /* es una cadena de texto que se utiliza para identificar y usar el componente en las plantillas HTML de la aplicación */
  templateUrl: './agregar-usuario.component.html', // especifica las rutas de los archivos de hojas de estilo CSS asociados con el componente
  styleUrls: ['./agregar-usuario.component.css'] // especifica las rutas de los archivos de hojas de estilo CSS asociados con el componente
})
export class AgregarUsuarioComponent implements OnInit { // llamado de componente AgregarUsuario implementando la interfaz OnInit

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
constructor(private usuariosService:UsuariosService){ // creación de constructor invocando el servicio de usuariosService que me trae información del backend

}

  ngOnInit(){ // Este método se utiliza para realizar tareas de inicialización en el componente, como la obtención de datos iniciales o la configuración de alguna variable

  }
  guardarUsuario(){ // Método que me guardará un Usuario

    delete this.usuario.created_at;
    delete this.usuario.updated_at; // al usar el método usuario el valor de estos campos se eliminará
    delete this.usuario.biometric_date;
    console.log(this.usuario);

    this.usuariosService.saveUsuario(this.usuario) // el Método saveUsuario del servicio usuariosService se llama pasandole como argumento el objeto this.usuario

      .subscribe( // utilizado para subscribirse a un flujo de eventos y recibir notificaciones de cuando ocurra un cambio
      // este método se utiliza para suscribirse a un Observable, el cual puede recibirme la respuesta del servidor
        res =>{
          console.log(res); // si la respuesta por parte del servidor es exitosa se imprime la respuesta
        },
        err => console.error(err) // de lo contrario saldrá un error
      )
  }

}
