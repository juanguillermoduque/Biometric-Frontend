import { Component, Inject, OnInit } from '@angular/core'; /*importación del componente OnInit*/
import { excusa } from '../../../excusas'; /*importación del modelo excusas trayendo la interfaz excusa*/
import { ExcusasService } from '../../../excusas.service'; /* importación del servicio ExcusasService que hace una conexión con el backend*/
import { MAT_DIALOG_DATA } from '@angular/material/dialog'; // importación MatDialog
import Swal from 'sweetalert2'

@Component({/* es un decorador que se utiliza para configurar las propiedades del componente "editar-excusa"*/
  selector: 'app-editar-excusas', /* es una cadena de texto que se utiliza para identificar y usar el componente en las plantillas HTML de la aplicación */
  templateUrl: './editar-excusas.component.html', // es una cadena de texto que especifica la ruta del archivo de plantilla HTML asociado con el componente
  styleUrls: ['./editar-excusas.component.css'] // especifica las rutas de los archivos de hojas de estilo CSS asociados con el componente
})
export class EditarExcusasComponent implements OnInit  { // llamado de componente EditarExcusa implementando la interfaz OnInit
  excusa : excusa = { // definición de variable excusa que esta inicializada con un objeto que sigue la estructura de la interfaz excusa
    id_excusa:0,
    id_horario:0, 
    id_aprendiz:0,
    estado:'',
    comments:'',
    ruta_archivo:''
};
constructor(private excusasService:ExcusasService, // creación de constructor invocando el servicio de ExcusasService que me trae información del backend
  
  @Inject(MAT_DIALOG_DATA) public idExcusa:number // MAT_DIALOG hace como un token para inyectar datos al parámetro idExcusa
  ){

}
  ngOnInit(){ // el ngOnInit se ejecuta cuando se inicializa el componente
    // se realiza el llamado al servicio excusaService para obtener datos de las excusas 
    if(this.idExcusa){ 
        this.excusasService.getExcusa(this.idExcusa)
          .subscribe( // utilizado para subscribirse a un flujo de eventos y recibir notificaciones de cuando ocurra un cambio
            res=>{ // si la respuesta por parte del servidor es exitosa se imprime la respuesta
              this.excusa = res;
              console.log(res);
            },
            err => console.error(err) // de lo contrario saldrá un error
          )
    }
  }

  modificarExcusa(){ // Método que me modificará la excusa 
    delete this.excusa.id_excusa; // al usar el método excusa el valor de id_excusa se eliminará
    delete this.excusa.id_horario;
    delete this.excusa.id_aprendiz;
    delete this.excusa.ruta_archivo;

    if (this.excusa.estado == '' || this.excusa.comments == ''){
      Swal.fire(
        {
          icon: 'error',
          title: 'Oops...',
          text: 'Hay campos sin completar',
        }
      )
    }
    else{
      this.excusasService.updateexcusa(this.idExcusa,this.excusa)
      // se llamará al método updateexcusa creado en el back y se pasará como parámetro el valor de IdExcusa y excusa 
        .subscribe( // utilizado para subscribirse a un flujo de eventos y recibir notificaciones de cuando ocurra un cambio
          res =>{ // si la respuesta por parte del servidor es exitosa se imprime la respuesta
            Swal.fire({
              position: 'center',
              icon: 'success',
              title: 'La excusa fue editada exitosamente',
              showConfirmButton: true,
          
            })
            console.log(res);
          },
          err => console.error(err) // de lo contrario saldrá un error
        )
    }
  }
}

