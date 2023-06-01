import { Component, OnInit } from '@angular/core';
import { asistencia } from '../../asistencia';
import { AsistenciasService } from '../../asistencias.service';

@Component({
  selector: 'app-crear-asistencias',
  templateUrl: './crear-asistencias.component.html',
  styleUrls: ['./crear-asistencias.component.css']
})
export class CrearAsistenciasComponent implements OnInit{

  asistencia: asistencia ={
    id_asistencia: 0,
    id_aprendiz: 0,
    id_horario: 0,
    hora_ingreso: '',
    comments: '',
    created_at: '',
    updated_at: '',
  };

  constructor(private asistenciasService:AsistenciasService){}
  
  ngOnInit(){}

  guardarAsistencia(){
    delete this.asistencia.created_at;
    delete this.asistencia.updated_at;
    delete this.asistencia.id_asistencia;
    

  this.asistenciasService.saveAsistencia(this.asistencia)
      .subscribe(
        res =>{
          console.log(res);
        },
        err => console.error(err)
      )
    }
}

