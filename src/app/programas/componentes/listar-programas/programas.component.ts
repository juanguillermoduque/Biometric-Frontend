import { Component, OnInit } from '@angular/core';
import { ProgramasService } from '../../programas.service';
import { FormControl } from '@angular/forms';
import { MatDialog } from '@angular/material/dialog';

import { CrearProgramaComponent } from '../crear-programa/crear-programa.component';
import { EditarProgramaComponent } from '../editar-programa/editar-programa.component';

@Component({
  selector: 'app-programas',
  templateUrl: './programas.component.html',  
  styleUrls: ['./programas.component.css'] 
})
export class ProgramasComponent{

  displayedColumns: string [] = ['name_programa'];
  programas :any = [];
  dataSource = this.programas;
  control = new FormControl();

  constructor(
    private programaService: ProgramasService
  ){}

ngOnInit(){
  this.getProgramas();
}

getProgramas(){
  this.programaService. getProgramas().subscribe(
    res =>{
      this.programas = res;
    },
    err => console.error(err)
  )
}

}


