import { Component, OnInit } from '@angular/core';
import { HorariosService } from '../../horarios.service';
import { MatDialog } from '@angular/material/dialog';
import { CrearHorariosComponent } from '../crear-horarios/crear-horarios.component';
import { EditarHorariosComponent } from '../editar-horarios/editar-horarios.component';
import { FormControl } from '@angular/forms';
import { debounceTime } from 'rxjs';

@Component({
  selector: 'app-horarios',
  templateUrl: './horarios.component.html',
  styleUrls: ['./horarios.component.css']
})
export class HorariosComponent implements OnInit{

  displayedColumns: string[] = ['Horario', 'Instructor', 'Jornada', 'Ficha','edit'];
  horarios:any = [];
  dataSource = this.horarios;
  control = new FormControl();

  constructor(
    private horarioService: HorariosService,
    public dialog: MatDialog,
    ){}

ngOnInit(){
  this.getHorarios();
  this.searchHorario();
  
  
}

getHorarios(){
  this.horarioService.getHorarios().subscribe(
    res =>{
      this.horarios = res;
      console.log(this.horarios);
    },
    err=>console.error(err)
  )
}

nuevoHorario(){
  this.dialog.open(CrearHorariosComponent,{
    height:'700px',
    width:'500px',
    panelClass: 'custom-dialog-create-update',
  })
}

editarHorarios(num_id : number){
  this.dialog.open(EditarHorariosComponent,{
    height:'700px',
    width:'500px',
    panelClass: 'custom-dialog-create-update',
    data: num_id
  });
}

searchHorario(){
  this.control.valueChanges.pipe(
      debounceTime(500)
    ).subscribe(query => {
  
      this.findHorarios(query)
    })
    
}
findHorarios(query:string){
    if (query == ""){
      this.getHorarios()
    }
  
    this.horarioService.search(query).subscribe(
    res=>{
      console.log("Busqueda realizada",res);
      this.horarios = res;
    },
    err=>{console.log(err)}
  )
  
}}
