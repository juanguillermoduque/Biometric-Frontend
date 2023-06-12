import { Component, OnInit } from '@angular/core';
import { asistencia } from '../../asistencia';
import { AsistenciasService } from '../../asistencias.service';
import { RolesService } from 'src/app/roles/roles.service';
import { HorariosService } from 'src/app/horarios/horarios.service';
import { UsuariosService } from 'src/app/usuarios/usuarios.service';

@Component({
  selector: 'app-crear-asistencias',
  templateUrl: './crear-asistencias.component.html',
  styleUrls: ['./crear-asistencias.component.css']
})
export class CrearAsistenciasComponent implements OnInit{

  asistencia: asistencia ={
    id_asistencia: 0,
    id_aprendiz: 0,
    id_horario: 0,
    hora_ingreso: '',
    comments: '',
    created_at: '',
    updated_at: '',
  };

  aprendices:any[] = [];
  horarios:any[] =[];

  constructor(private asistenciasService:AsistenciasService,
    private rolesService:RolesService,
    private horariosService:HorariosService,
    private usuariosService:UsuariosService){}
  
  ngOnInit(){
    this.getIdAprendices();
    this.getHorarios();
  }

  getHorarios(){
    this.horariosService.getHorarios().subscribe(
      res => {
        let aux:any = res;
        this.horarios.push(aux[0]);
      }
    )
  }

  getIdAprendices(){
    this.rolesService.getAprendices().subscribe(
      res => {
        let aux:any = res;
        this.aprendices.push(aux);
        this.getAprendices(this.aprendices[0]);
      }
    )
  }

  getAprendices(aprendicesId:any){
    let aprendices:any = [];
    for(let i = 0; i < aprendicesId.length; i++){
      this.usuariosService.getUsuario(aprendicesId[i].id_usuario).subscribe(
        res => {
          let aux:any = res;
          aprendices.push(aux);
        }
      )
    }
    this.aprendices = aprendices;
  }

  getCurrentTime(){
    let fecha = new Date();
    let hora = fecha.getHours();
    let minutos = fecha.getMinutes();
    let segundos = fecha.getSeconds();
    let horaActual = hora + ":" + minutos + ":" + segundos;
    this.asistencia.hora_ingreso = horaActual;
  }


  guardarAsistencia(){
    delete this.asistencia.created_at;
    delete this.asistencia.updated_at;
    delete this.asistencia.id_asistencia;

    this.asistenciasService.saveAsistencia(this.asistencia)
      .subscribe(
        res =>{ 

        },
        err => console.error(err)
      )
  }

  agregarAprendiz(id:any){
    this.asistencia.id_aprendiz = id;
  } 

  agregarHorario(id:any){
    this.asistencia.id_horario = id;
  }
}

