import { query } from '@angular/animations';
import { identifierName } from '@angular/compiler';
import { Component } from '@angular/core';
import { FormControl } from '@angular/forms';
import { MatDialog } from '@angular/material/dialog';
import { debounceTime } from 'rxjs';
import { AsistenciasService } from '../../asistencias.service';
import { CrearAsistenciasComponent } from '../crear-asistencias/crear-asistencias.component';
import { EditarAsistenciasComponent } from '../editar-asistencias/editar-asistencias.component';
import { ficha } from '../../../fichas/fichas';

@Component({
  selector: 'app-asistencias',
  templateUrl: './asistencias.component.html',
  styleUrls: ['./asistencias.component.css']
})
export class AsistenciasComponent {
  displayedColumns: string[] = ['fechaIngreso', 'numIngreso', 'asistio', 'noAsistio', 'aula', 'observaciones', 'horaIngreso', 'horaSalida'];
  asistencias:any = [];
  dataSource = this.asistencias;
  control = new FormControl();

  constructor(private asistenciaService:AsistenciasService,private dialog:MatDialog){}

  ngOnInit(){
    this.getAsistencias();
    this.searchAsistencia();
  }

  getAsistencias(){
    this.asistenciaService.getAsistencias().subscribe(
      res =>{
        this.asistencias = res;
        console.log(this.asistencias);
      },
      err=>console.error(err)
    )
  }

  searchAsistencia(){

    this.control.valueChanges.pipe(
      debounceTime(500)
    ).subscribe(query => {
  
      this.findAsistencias(query)
    }) 
}

findAsistencias(query:string){
  if (query == ""){
    this.getAsistencias()
  }

  this.asistenciaService.search(query).subscribe(
  res=>{
    console.log("Busqueda realizada",res);
    this.asistencias = res;
  },
    err=>{console.log(err)}
  )

  }

  crearAsistencia(){
    this.dialog.open(CrearAsistenciasComponent,{
      height:'400px',
      width:'600px'
    })
  }

  editarAsistencia(idAsistencia:Number){
    this.dialog.open(EditarAsistenciasComponent,{
      height:'400px',
      width:'600px',
      data:idAsistencia
    })
  }
}
