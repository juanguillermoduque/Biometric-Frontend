import { Component } from '@angular/core';
import { asistencia } from 'src/app/models/asistencia';
import { AsistenciasService } from 'src/app/services/asistencias/asistencias.service';

@Component({
  selector: 'app-editar-asistencias',
  templateUrl: './editar-asistencias.component.html',
  styleUrls: ['./editar-asistencias.component.css']
})
export class EditarAsistenciasComponent {

  asistencia: asistencia ={
    id_asistencia:0,
    hora_ingreso:'',
    comments:'',
    created_at :'',
    updated_at :'',
  };

  constructor(private asistenciasService:AsistenciasService){}

  ngOnInit(){}
  
  modificarAsistencia(){
    delete this.asistencia.created_at;
    delete this.asistencia.updated_at;
  }
}
