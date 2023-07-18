import { Component, Inject } from '@angular/core';
import { asistencia } from '../../asistencia';
import { AsistenciasService } from '../../asistencias.service';
import { RolesService } from 'src/app/roles/roles.service';
import { HorariosService } from 'src/app/horarios/horarios.service';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { UsuariosService } from 'src/app/usuarios/usuarios.service';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-editar-asistencias',
  templateUrl: './editar-asistencias.component.html',
  styleUrls: ['./editar-asistencias.component.css']
})
export class EditarAsistenciasComponent {

  asistencia: asistencia ={
    id_asistencia: 0,
    id_aprendiz: 0,
    id_horario: 0,
    hora_ingreso: '',
    comments: '',
    created_at: '',
    updated_at: '',
  };

  aprendizInicial:object;
  horarioInicial:object;

  aprendices:any[] = [];
  horarios:any[] =[];

  constructor(private asistenciasService:AsistenciasService,
    private rolesService:RolesService,
    private horariosService:HorariosService,
    private usuariosServise:UsuariosService,
    @Inject(MAT_DIALOG_DATA) public data:number,
    public dialogRef: MatDialogRef<EditarAsistenciasComponent>
    ){}

  ngOnInit(){
    this.getAsistencia();
    this.getAprendices();
    this.getHorarios();
  }

  getAsistencia(){
    this.asistenciasService.getAsistencia(this.data).subscribe(
      (res:any)=>{
        this.asistencia = res;
        this.usuariosServise.getUsuario(res.id_aprendiz).subscribe(
          aprendiz=>{
            this.aprendizInicial = aprendiz;
          }
        )

        this.horariosService.getHorario(res.id_horario).subscribe(
          horario=>{
            this.horarioInicial = horario;
          }
        )
      }
    )
    
  }

  modificarAsistencia(){
    delete this.asistencia.created_at;
    delete this.asistencia.updated_at;
    delete this.asistencia.id_asistencia;

    if (this.asistencia.id_aprendiz == 0 || this.asistencia.id_horario == 0){
      Swal.fire(
        {
          icon: 'error',
          title: 'Oops...',
          text: 'Hay campos sin completar',
        }
      )
    }
    else{
      
    this.asistenciasService.updateAsistencia(this.data,this.asistencia)
      .subscribe(
        res =>{ 
          Swal.fire({
            position: 'center',
            icon: 'success',
            title: 'La asistencia fue agregada exitosamente',
            showConfirmButton: true,
          }).then((result) => {
            if (result.isConfirmed) {
              this.dialogRef.close();
            } 
          });
        },
        err => console.error(err)
      )
    }
  }

  getHorarios(){
    this.horariosService.getHorarios().subscribe(
      res => {
        let aux:any = res;
        this.horarios.push(aux[0]);
      }
    )
  }

  getAprendices(){
    this.rolesService.getAprendices().subscribe(
      res => {
        
        let aux:any = res;
        this.aprendices = aux;
      }
    )
  }

  getCurrentTime(){
    let fecha = new Date();
    let hora = fecha.getHours();
    let minutos = fecha.getMinutes();
    let segundos = fecha.getSeconds();
    let horaActual = hora + ":" + minutos + ":" + segundos;
    this.asistencia.hora_ingreso = horaActual;
  }

  agregarAprendiz(id:any){
    this.asistencia.id_aprendiz = id;
  } 

  agregarHorario(id:any){
    this.asistencia.id_horario = id;
  }
}
