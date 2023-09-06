import { Component, OnInit } from '@angular/core';
import { HorariosService } from '../../horarios.service';
import { MatDialog } from '@angular/material/dialog';
import { CrearHorariosComponent } from '../crear-horarios/crear-horarios.component';
import { EditarHorariosComponent } from '../editar-horarios/editar-horarios.component';
import { FormControl } from '@angular/forms';
import { debounceTime } from 'rxjs';
import { MatDatepickerInputEvent } from '@angular/material/datepicker';
import { horario } from '../../horarios';
import { DatePipe } from '@angular/common';

@Component({
  selector: 'app-horarios',
  templateUrl: './horarios.component.html',
  styleUrls: ['./horarios.component.css']
})
export class HorariosComponent implements OnInit{

  displayedColumns: string[] = ['Instructor', 'Jornada', 'Ficha','Horario','fecha','edit'];
  horarios:any = [];
  fechas:any = [];
  dataSource = this.horarios;
  control = new FormControl();
  controlFecha = new FormControl();

  horario : horario = {
    id_instructor:0,
    jornada: '',
    id_ficha: 0,
    date_start: '',
    date_end: '',
    fecha: '',
  };

  constructor(
    private horarioService: HorariosService,
    public dialog: MatDialog,
    ){}

  selectedDates: Array<Date | null> = [];

ngOnInit(){
  this.getHorarios();
  this.searchHorario();
  this.searchFecha();
}

getHorarios(){
  this.horarioService.getHorarios().subscribe(
    res =>{
      this.horarios = res;
    },
    err=>console.error(err)
  )
}

nuevoHorario(){
  this.dialog.open(CrearHorariosComponent,{
    height:'700px',
    width:'500px',
    panelClass: 'custom-dialog-create-update',
  }).afterClosed().subscribe(
    ()=>{
      this.getHorarios();
    }
  )
}

editarHorarios(num_id : number){
  this.dialog.open(EditarHorariosComponent,{
    height:'700px',
    width:'500px',
    panelClass: 'custom-dialog-create-update',
    data: num_id
  }).afterClosed().subscribe(
    ()=>{
      this.getHorarios();
    }
  );
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
      this.horarios = res;
    },
    err=>{console.log(err)}
  )
  
}

searchFecha(){
  this.controlFecha.valueChanges.pipe(
      debounceTime(500)
    ).subscribe(query => {
      this.findFechas(query)
    })
    
}
findFechas(query:Date | null){
    if (query == null){
      this.getHorarios()
    }
    
    let date = this.normalizarDate(query); 
    console.log(date)
    this.horarioService.search(date).subscribe(
      res=>{
        this.horarios = res;
        
      },
      err=>{console.log(err)}
  )  
}

addEvent(event: MatDatepickerInputEvent<Date>): void {
  this.selectedDates.push(event.value);
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
}

