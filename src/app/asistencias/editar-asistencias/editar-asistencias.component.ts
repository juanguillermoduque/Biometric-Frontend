import { Component,OnInit } from '@angular/core';
import { asistencia } from 'src/app/models/asistencia';
import { AsistenciasService } from 'src/app/services/asistencias/asistencias.service';
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-editar-asistencias',
  templateUrl: './editar-asistencias.component.html',
  styleUrls: ['./editar-asistencias.component.css']
})
export class EditarAsistenciasComponent {

  asistencia: asistencia ={
    idasistencia:0,
    date_enter:'',
    date_start:'',
    date_end:'',
    aula:0,
    Estado:'',
    comments:'',
    created_at :'',
    updated_at :'',
  };
params = this.activeRouted.snapshot.params;

  constructor(private asistenciasService:AsistenciasService, private activeRouted:ActivatedRoute){

  }


  ngOnInit(){
    if(this.params['id']){
      this.asistenciasService.getAsistencia(this.params['id'])
        .subscribe(
          res=>{
            console.log(res);

          },
          err => console.error(err)
        )

  }
}

  modificarAsistencia(){
    delete this.asistencia.created_at;
    delete this.asistencia.updated_at;
    delete this.asistencia.date_enter;
    delete this.asistencia.date_start;
    delete this.asistencia.date_end;

  this.asistenciasService.updateAsistencia(this.params['id'],this.asistencia)
      .subscribe(
        res =>{
          console.log(res);
        },
        err => console.error(err)
      )
    }


}

/*Este código es un componente de Angular que define la funcionalidad de la página de edición de asistencia. Importa las
dependencias necesarias y define un objeto asistencia con sus propiedades iniciales. El componente también tiene una variable
params que almacena los parámetros de la ruta activa y un constructor que inyecta servicios necesarios. En el método ngOnInit(),
se comprueba si la página tiene un parámetro 'id' y se llama al método getAsistencia del servicio de asistencias para obtener
los detalles de la asistencia correspondiente. Por último, el método modificarAsistencia se encarga de eliminar algunas propiedades
 del objeto asistencia y llamar al método updateAsistencia del servicio de asistencias para guardar los cambios.*/
