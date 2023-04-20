import { Component, OnInit } from '@angular/core';
import { HorariosService } from '../services/horarios/horarios.service';
import { MatDialog } from '@angular/material/dialog';

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

}
