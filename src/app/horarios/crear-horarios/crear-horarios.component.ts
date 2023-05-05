import { Component, OnInit } from '@angular/core';
import { horario } from 'src/app/models/horarios';
import { HorariosService } from 'src/app/services/horarios/horarios.service';

@Component({
  selector: 'app-crear-horarios',
  templateUrl: './crear-horarios.component.html',
  styleUrls: ['./crear-horarios.component.css']
})
export class CrearHorariosComponent{
  horario : horario = {
    id_instructor:0,
    jornada: '',
    id_ficha: 0,
    date_start: '',
    date_end: '',
    created_at: '',
    updated_at: '',
  };

  constructor(private horarioService:HorariosService){}

  guardarHorario(){
    delete this.horario.created_at;
    delete this.horario.updated_at;
    console.log(this.horario);

    this.horarioService.saveHorario(this.horario).subscribe(
      res =>{
        console.log(res);
      },
      err => console.error(err)
    )
}

}
