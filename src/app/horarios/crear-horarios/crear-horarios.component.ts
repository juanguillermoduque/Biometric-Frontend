import { Component, OnInit } from '@angular/core';
import { horario } from 'src/app/models/horarios';
import { HorariosService } from 'src/app/services/horarios/horarios.service';
import Swal from 'sweetalert2'

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
    if (this.horario.id_instructor == 0 || this.horario.jornada == '' || this.horario.id_ficha == 0
    || this.horario.date_start == '' || this.horario.date_end == '' || this.horario.created_at == ''
    || this.horario.updated_at == ''){

      Swal.fire(
        {
          icon: 'error',
          title: 'Oops...',
          text: 'Hay campos sin completar',
        }
      )
      this.horario.id_instructor=0
      this.horario.jornada= ''
      this.horario.id_ficha= 0
      this.horario.date_start= ''
      this.horario.date_end= ''
      this.horario.created_at= ''
      this.horario.updated_at= ''
    }
    else{
      this.horario.jornada = this.horario.jornada?.toLowerCase()
      this.horarioService.saveHorario(this.horario).subscribe(
        res =>{
          Swal.fire({
            position: 'center',
            icon: 'success',
            title: 'El horario fue creado exitosamente',
            showConfirmButton: false,
            timer: 1500
          })
          console.log(res);
        },
        err => console.error(err)
      )
  }
}

}
