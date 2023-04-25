
import { Component, OnInit } from '@angular/core';
import { ExcusasService } from '../services/excusas/excusas.service';
import {MatDialog, MatDialogRef} from '@angular/material/dialog';
import { CrearExcusaComponent } from './crear-excusa/crear-excusa.component';
import { EditarExcusasComponent } from './editar-excusas/editar-excusas.component';

@Component({
  selector: 'app-excusas',
  templateUrl: './excusas.component.html',
  styleUrls: ['./excusas.component.css']
})

export class ExcusasComponent implements OnInit{
  displayedColumns: string[] = ['N°', 'Fecha', 'Instructor/a', 'Estado'];
  excusas:any = ['','','','','',''];
  dataSource = this.excusas;

  constructor(
    private excusaService: ExcusasService,
    public dialog: MatDialog,
    ){

  }
  ngOnInit(){
    this.excusaService.getexcusas().subscribe(
      res =>{
        this.excusas = res;
        console.log(this.excusas);
      },
      err=>console.error(err)
    )
  }

  crearExcusa(){
    this.dialog.open(CrearExcusaComponent, {
      height: '500px',
      width: '600px',
    });
  }

  editarExcusa(idExcusa :number){
    this.dialog.open(EditarExcusasComponent, {
      height: '800px',
      width: '600px',
      data: idExcusa,
    });
  }

}

  export interface PeriodicElement {
    numero: number;
    fecha: string;
    instructor: string;
    estado: string;
  }
  
  const ELEMENT_DATA: PeriodicElement[] = [
    {numero: 1, fecha: '29/03/2023', instructor: 'Wilson Ramírez', estado: 'Validado'},
  ]  

