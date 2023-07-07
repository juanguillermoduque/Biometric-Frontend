import { Component, Inject, OnInit } from '@angular/core';
import { horario } from '../../horarios';
import { HorariosService } from '../../horarios.service';
import Swal from 'sweetalert2'
import { UsuariosService } from 'src/app/usuarios/usuarios.service';
import { RolesService } from 'src/app/roles/roles.service';
import { FichasService } from 'src/app/fichas/fichas.service';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';

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
    fecha:"",
    created_at: '',
    updated_at: '',
  };


  instructores:any = [];
  fichas:any;
  fichasAux:any;
  
  fichaInstructor = {
    id_instructor: 0 , 
    id_ficha: 0
  };
  
  constructor(private horarioService:HorariosService, private rolesService:RolesService, 
  private usuariosService:UsuariosService, private fichasService:FichasService, 
  public dialogRef: MatDialogRef<EditarHorariosComponent>,
  @Inject(MAT_DIALOG_DATA) public data:number
  ){}

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
    console.log(this.data)
    this.getHorario();
    this.getInstructor();
    this.getFichas();
  }

  getHorario(){
   this.horarioService.getHorario(this.data).subscribe(
    (data)=>{
      this.horario = data;
      console.log(this.horario)
    }
   )
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
    || this.horario.date_start == '' || this.horario.date_end == ''){

      Swal.fire(
        {
          icon: 'error',
          title: 'Oops...',
          text: 'Hay campos sin completar',
        }
      )
    }
    else{
      if(this.horario.fecha !== undefined){
        let date = new Date(this.horario.fecha)
        this.horario.fecha = this.normalizarDate(date)
        console.log(this.horario.fecha)
      }
      
      
      this.horarioService.updateHorario(this.data,this.horario).subscribe(
        res =>{
          Swal.fire({
            position: 'center',
            icon: 'success',
            title: 'El horario fue modificado exitosamente',
            showConfirmButton: true,
            
          }).then((result) => {
            if (result.isConfirmed) {
              this.dialogRef.close();
            } 
          });
          console.log(res);
        },
        err => console.error(err)
      )

    }
  }
}