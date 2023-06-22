import { Component, OnInit } from '@angular/core';
import { horario } from '../../horarios';
import { HorariosService } from '../../horarios.service';
import Swal from 'sweetalert2'
import { UsuariosService } from 'src/app/usuarios/usuarios.service';
import { RolesService } from 'src/app/roles/roles.service';
import { FichasService } from 'src/app/fichas/fichas.service';

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


  instructores:any = [];
  instructoresIdRol:any= [];
  instructoresId:any[]= [];
  fichas:any;
  fichasAux:any;
  
  fichaInstructor = {
    id_instructor: 0 , 
    id_ficha: 0
  };
  
  constructor(private horarioService:HorariosService, private rolesService:RolesService, 
  private usuariosService:UsuariosService, private fichasService:FichasService){}

  agregarInstructor(instructor:any){
    this.fichaInstructor.id_instructor = instructor.num_id;
    this.horario.id_instructor = instructor.num_id;
  }

  agregarFicha (ficha:any){
    this.fichaInstructor.id_ficha = ficha.id_ficha;
    this.horario.id_ficha = ficha.id_ficha;
  }
  
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