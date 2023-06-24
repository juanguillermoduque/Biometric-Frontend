import { Component, OnInit } from '@angular/core';
import { horario } from '../../horarios';
import { HorariosService } from '../../horarios.service';
import Swal from 'sweetalert2'
import { RolesService } from '../../../roles/roles.service';
import { UsuariosService } from '../../../usuarios/usuarios.service';
import { FichasService } from '../../../fichas/fichas.service';

@Component({
  selector: 'app-crear-horarios',
  templateUrl: './crear-horarios.component.html',
  styleUrls: ['./crear-horarios.component.css']
})
export class CrearHorariosComponent implements OnInit{ 
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
          })
          console.log(res);
        },
        err => console.error(err)
      )
  }
    this.horarioService.saveHorario(this.horario).subscribe(
      res => {
        this.rolesService.createFichaInstructor(this.fichaInstructor).subscribe(
          data => console.log(data)
        )
      },
      err => console.error(err)
    )
}

  ngOnInit(): void {
    this.getIdUsuario();
    this.getFichas();
  }
  
  getIdUsuario(){
    this.rolesService.searchInstructores().subscribe(
      (instructores) => {
        this.instructoresIdRol = instructores;
        this.getUsuario();
      }
    );
  }
  getUsuario(){
    for(let i = 0; i < this.instructoresIdRol.length; i++){
      this.instructoresId.push(this.instructoresIdRol[i].id_usuario)
    }
    this.getInstructor();
  }
  getInstructor(){
    for(let i = 0; i < this.instructoresId.length; i++){
      this.usuariosService.getUsuario(this.instructoresId[i]).subscribe(
        (data)=>{
          this.instructores.push(data);
        }
      )
    }
    
  }
  getFichas(){
    this.fichasService.getFichas().subscribe(
      (fichas) => {
        this.fichasAux = fichas;
        this.fichas = this.fichasAux[0];
      }
    );
  }

}
