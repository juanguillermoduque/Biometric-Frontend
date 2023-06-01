import { Component, OnInit } from '@angular/core'; /*importación del componente OnInit*/
import { excusa } from '../../excusas'; /*importación del modelo excusas trayendo la interfaz excusa*/
import { ExcusasService } from '../../excusas.service'; /* importación del servicio ExcusasService que hace una conexión con el backend*/
import Swal from 'sweetalert2'

@Component({ /* es un decorador que se utiliza para configurar las propiedades del componente "crear-excusa"*/
  selector: 'app-crear-excusa', /* es una cadena de texto que se utiliza para identificar y usar el componente en las plantillas HTML de la aplicación */
  templateUrl: './crear-excusa.component.html', // es una cadena de texto que especifica la ruta del archivo de plantilla HTML asociado con el componente
  styleUrls: ['./crear-excusa.component.css'] // especifica las rutas de los archivos de hojas de estilo CSS asociados con el componente
})
export class CrearExcusaComponent implements OnInit { // llamado de componente CrearExcusa implementando la interfaz OnInit
  excusa : excusa = { // definición de variable excusa que esta inicializada con un objeto que sigue la estructura de la interfaz excusa
    id_excusa:0,
    id_asistencia:0, 
    comments:'',
    archivo:'',
};

constructor(private excusasService:ExcusasService){ // creación de constructor invocando el servicio de ExcusasService que me trae información del backend
}

  ngOnInit(){ // Este método se utiliza para realizar tareas de inicialización en el componente, como la obtención de datos iniciales o la configuración de alguna variable
  }

  guardarExcusa(){ // Método que me guardará la excusa 
    delete this.excusa.id_excusa; // al usar el método excusa el valor de id_excusa se eliminará
    if (this.excusa.comments == ''){
      Swal.fire(
        {
          icon: 'error',
          title: 'Oops...',
          text: 'Hay campos sin completar',
        }
      )
      this.excusa.comments=''
   
    }
    else{
      this.excusasService.saveexcusa(this.excusa) // el Método saveexcusa del servicio excusasService se llama pasandole como argumento el objeto this.excusa
        .subscribe( // utilizado para subscribirse a un flujo de eventos y recibir notificaciones de cuando ocurra un cambio
        // este método se utiliza para suscribirse a un Observable, el cual puede recibirme la respuesta del servidor
          res =>{  // si la respuesta por parte del servidor es exitosa se imprime la respuesta
            Swal.fire({
              position: 'center',
              icon: 'success',
              title: 'La excusa fue agregada exitosamente',
              showConfirmButton: false,
              timer: 1500
            })
            console.log(res);
          },
          err => console.error(err) // de lo contrario saldrá un error
        )
    }
  }
}
