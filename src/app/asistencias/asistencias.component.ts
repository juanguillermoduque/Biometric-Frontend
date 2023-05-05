import { Component } from '@angular/core';
import { AsistenciasService } from 'src/app/services/asistencias/asistencias.service';
@Component({
  selector: 'app-asistencias',
  templateUrl: './asistencias.component.html',
  styleUrls: ['./asistencias.component.css']
})
export class AsistenciasComponent {
  displayedColumns: string[] = ['fechaIngreso', 'numIngreso', 'asistio', 'noAsistio', 'aula', 'observaciones', 'horaIngreso', 'horaSalida'];
  asistencias:any = [];
  dataSource = this.asistencias;

  constructor(private asistenciaService:AsistenciasService){}

  ngOnInit(){
    this.asistenciaService.getAsistencias().subscribe(
      res =>{
        this.asistencias = res;
        console.log(this.asistencias);
      },
      err=>console.error(err)
    )
  }
}

