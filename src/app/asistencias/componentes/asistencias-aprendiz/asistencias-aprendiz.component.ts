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

  getAsistencias(){
    this.asistenciaService.getAsistencias().subscribe(
      (res:any) =>{
        let tok:any = localStorage.getItem('token')
        let decode:any = jwtDecode(tok);
        let listaAux = []
        let idUser = decode.data[0].num_id;
        for(let i = 0; i < res[0].length;i++){
          if(res[0][i].id_aprendiz == idUser){
            listaAux.push(res[0][i])
            
          }
        }
        this.asistencias = listaAux;
      },
      err=>console.error(err)
    )
  }

}

