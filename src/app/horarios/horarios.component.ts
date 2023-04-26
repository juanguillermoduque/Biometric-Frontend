import { Component, OnInit } from '@angular/core';
import { HorariosService } from '../services/horarios/horarios.service';
import { MatDialog } from '@angular/material/dialog';
import { CrearHorariosComponent } from './crear-horarios/crear-horarios.component';
import { EditarHorariosComponent } from './editar-horarios/editar-horarios.component';

@Component({
  selector: 'app-horarios',
  templateUrl: './horarios.component.html',
  styleUrls: ['./horarios.component.css']
})
export class HorariosComponent implements OnInit{
editarhorarios(arg0: any) {
throw new Error('Method not implemented.');
}
agregarHorario() {
throw new Error('Method not implemented.');
}
  displayedColumns: string[] = ['Horario', 'Instructor', 'Jornada', 'Ficha','edit'];
  horarios:any = [];
  dataSource = this.horarios;

  constructor(
    private horarioService: HorariosService,
    public dialog: MatDialog,
    ){

}

ngOnInit(){
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
    width:'1000px',
    height: '1000px',
  })
}

editarHorarios(num_id : number){
  this.dialog.open(EditarHorariosComponent,{
    height:'800px',
    width: '600px',
    data: num_id
  });
}
}

