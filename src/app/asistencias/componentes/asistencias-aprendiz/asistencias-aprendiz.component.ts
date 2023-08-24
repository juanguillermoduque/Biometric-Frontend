import { Component } from '@angular/core';
import { FormControl } from '@angular/forms';
import { debounceTime } from 'rxjs';
import { AsistenciasService } from '../../asistencias.service';
import jwtDecode from 'jwt-decode';

@Component({
  selector: 'app-asistencias-aprendiz',
  templateUrl: './asistencias-aprendiz.component.html',
  styleUrls: ['./asistencias-aprendiz.component.css']
})
export class AsistenciasAprendizComponent {

  displayedColumns: string[] = ['numId', 'fecha', 'observaciones','horaIngreso'];
  asistencias:any = [];
  dataSource = this.asistencias;

  constructor(private asistenciaService:AsistenciasService){}

  ngOnInit(){
    this.getAsistencias();
  }
  
  getIdUsuario(){
    let tok:any = localStorage.getItem('token')
    let decode:any = jwtDecode(tok);
    return decode.data[0].num_id;
  }


  getAsistencias(){
    this.asistenciaService.getAsistenciasAprendiz(this.getIdUsuario()).subscribe(
      (res:any) =>{
        console.log(res)
        this.asistencias = res;
      },
      err=>console.error(err)
    )
  }

}

