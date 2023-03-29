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
