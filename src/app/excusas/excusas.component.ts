
import { Component, OnInit } from '@angular/core';  /*importación del componente OnInit*/
import { ExcusasService } from '../services/excusas/excusas.service'; /* importación del servicio ExcusasService que hace una conexión con el backend*/
import {MatDialog, MatDialogRef} from '@angular/material/dialog'; // importación del componente MatDialog
import { CrearExcusaComponent } from './crear-excusa/crear-excusa.component'; // importación del componente CrearExcusas
import { EditarExcusasComponent } from './editar-excusas/editar-excusas.component'; // importación del componente EditarExcusa

@Component({ /* es un decorador que se utiliza para configurar las propiedades del componente "excusas*/
  selector: 'app-excusas', /* es una cadena de texto que se utiliza para identificar y usar el componente en las plantillas HTML de la aplicación */
  templateUrl: './excusas.component.html',  // es una cadena de texto que especifica la ruta del archivo de plantilla HTML asociado con el componente
  styleUrls: ['./excusas.component.css'] // especifica las rutas de los archivos de hojas de estilo CSS asociados con el componente
})

export class ExcusasComponent implements OnInit{ // llamado de componente Excusas implementando la interfaz OnInit
  displayedColumns: string[] = ['N°', 'Fecha', 'Instructor/a', 'Estado']; // Arreglo de columnas para mostrar en una tabla
  excusas:any = ['','','','','','']; // variable excusa que es un arreglo de 6 valores vacíos todos de tipo string
  dataSource = this.excusas; // se utiliza como fuente de datos para la tabla

  constructor(
    private excusaService: ExcusasService, // definición de ExcusasService que tiene la conexión con el back
    public dialog: MatDialog, // MatDialog proporciona una ventana emergente en la cual se puede ingresar información sin la necesidad de cambiar de ruta
    ){

  }
  ngOnInit(){ // el ngOnInit se ejecuta cuando se inicializa el componente
    // se realiza el llamado al servicio excusaService para obtener datos de las excusas
    this.excusaService.getexcusas().subscribe( // utilizado para subscribirse a un flujo de eventos y recibir notificaciones de cuando ocurra un cambio
      res =>{ // si la respuesta por parte del servidor es exitosa se asigna el valor de res a this.excusas y luego se muestra por pantalla el valor de excusas
        this.excusas = res;
        console.log(this.excusas);
      },
      err=>console.error(err) // de lo contrario saldrá un error
    )
  }

  crearExcusa(){ // Método crearExcusa que me muestra una ventana emergente con el componente CrearExcusa
    this.dialog.open(CrearExcusaComponent, {
      height: '500px',
      width: '600px',
    });
  }

  editarExcusa(idExcusa :number){ // Método editarExcusa que me muestra una ventana emergente con el componente EditarExcusa
    // como parámetro me recibira el valor de idExcusa
    this.dialog.open(EditarExcusasComponent, {
      height: '800px',
      width: '600px',
      data: idExcusa, // data almacenará el valor de este
    });
  }

}

  export interface PeriodicElement {
    numero: number;
    fecha: string;
    instructor: string;
    estado: string;
  }

  const ELEMENT_DATA: PeriodicElement[] = [
    {numero: 1, fecha: '29/03/2023', instructor: 'Wilson Ramírez', estado: 'Validado'},
  ]

