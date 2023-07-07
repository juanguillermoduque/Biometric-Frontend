import { Component, OnInit } from '@angular/core';
import { horario } from '../../horarios';
import { HorariosService } from '../../horarios.service';
import Swal from 'sweetalert2'
import { RolesService } from '../../../roles/roles.service';
import { UsuariosService } from '../../../usuarios/usuarios.service';
import { FichasService } from '../../../fichas/fichas.service';
import { MatDatepickerInputEvent } from '@angular/material/datepicker';
import { MatDialogRef } from '@angular/material/dialog';

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
    fecha: '',
  };

  instructores:any = [];
  fichas:any;
  fichasAux:any;
  
  fichaInstructor = {
    id_instructor: 0 , 
    id_ficha: 0
  };

  selectedDates: Array<Date | null> = [];
  
  constructor(private horarioService:HorariosService, private rolesService:RolesService, 
  private usuariosService:UsuariosService, private fichasService:FichasService,
  public dialogRef: MatDialogRef<CrearHorariosComponent>){}

  agregarInstructor(instructor:any){
    this.fichaInstructor.id_instructor = instructor.num_id;
    this.horario.id_instructor = instructor.num_id;
  }

  agregarFicha (ficha:any){
    this.fichaInstructor.id_ficha = ficha.id_ficha;
    this.horario.id_ficha = ficha.id_ficha;
  }

  guardarHorario(){

    if (this.horario.id_instructor == 0 || this.horario.jornada == '' || this.horario.id_ficha == 0
    || this.horario.date_start == '' || this.horario.date_end == '' || this.selectedDates.length == 0){

      Swal.fire(
        {
          icon: 'error',
          title: 'Oops...',
          text: 'Hay campos sin completar',
        }
      )
    }
    else{
      for(let i = 0; i < this.selectedDates.length; i++){
        this.horario.fecha = this.normalizarDate(this.selectedDates[i]);
        this.horarioService.saveHorario(this.horario).subscribe(
          res => {
            this.rolesService.createFichaInstructor(this.fichaInstructor).subscribe(
              data => console.log(data)
            )
          },
          err => console.error(err)
        )
      }
      Swal.fire({
        position: 'center',
        icon: 'success',
        title: 'Creación exitosa',
        showConfirmButton: true,
      }).then((result) => {
        if (result.isConfirmed) {
          this.dialogRef.close();
        } 
      });
    }

  }

  normalizarDate(date:Date|null){
  if(date == null){
    return '';
  }
    let day = date.getDate()
    let month = date.getMonth() + 1
    let year = date.getFullYear()
    if(month < 10){
      return(`${year}-0${month}-${day}`)
    }else{
      return(`${year}-${month}-${day}`)
    }
  }

  ngOnInit(): void {
    this.getInstructor();
    this.getFichas();
  }

  addEvent(event: MatDatepickerInputEvent<Date>): void {
    this.selectedDates.push(event.value);
  }
  deleteDate(date: Date | null): void {
    const index = this.selectedDates.indexOf(date);
    if (index !== -1) {
      this.selectedDates.splice(index, 1);
    }
  }
  

  getInstructor(){
    this.rolesService.searchInstructores().subscribe(
      (data)=>{
        this.instructores = data;
      }
    )
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
