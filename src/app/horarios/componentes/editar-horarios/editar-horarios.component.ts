import { Component, OnInit } from '@angular/core';
import { horario } from '../../horarios';
import { HorariosService } from '../../horarios.service';
import Swal from 'sweetalert2'

@Component({
  selector: 'app-editar-horarios',
  templateUrl: './editar-horarios.component.html',
  styleUrls: ['./editar-horarios.component.css']
})
export class EditarHorariosComponent{
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
  
  ModificarHorario(){
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
    }
    else{
      this.horario.jornada = this.horario.jornada?.toLowerCase()
      this.horarioService.saveHorario(this.horario).subscribe(
        res =>{
          Swal.fire({
            position: 'center',
            icon: 'success',
            title: 'El horario fue modificado exitosamente',
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