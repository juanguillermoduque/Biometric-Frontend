import { Component, OnInit } from '@angular/core';
import { asistencia } from 'src/app/models/asistencia';
import { AsistenciasService } from 'src/app/services/asistencias/asistencias.service';

@Component({
  selector: 'app-crear-asistencias',
  templateUrl: './crear-asistencias.component.html',
  styleUrls: ['./crear-asistencias.component.css']
})
export class CrearAsistenciasComponent implements OnInit{

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

  constructor(private asistenciasService:AsistenciasService){

  }


  ngOnInit(){
    
  }
  guardarAsistencia(){
    delete this.asistencia.created_at;
    delete this.asistencia.updated_at;
    delete this.asistencia.date_enter;
    delete this.asistencia.date_start;
    delete this.asistencia.date_end;

  this.asistenciasService.saveAsistencia(this.asistencia)
      .subscribe(
        res =>{
          console.log(res);
        },
        err => console.error(err)
      )
    }


}
