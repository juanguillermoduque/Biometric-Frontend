import { Component } from '@angular/core';
import { Component, OnInit } from '@angular/core';
import { ExcusasService } from '../services/excusas/excusas.service';
import {MatDialog, MatDialogRef} from '@angular/material/dialog';

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
    this.fichaService.getFichas().subscribe(
      res =>{
        this.fichas = res;
        console.log(this.fichas);
      },
      err=>console.error(err)
    )
  }

  agregarFicha(){
    this.dialog.open(AgregarFichasComponent, {
      height: '500px',
      width: '600px',
    });
  }

  editarFicha(idFicha :number){

    this.dialog.open(EditarFichasComponent, {
      height: '800px',
      width: '600px',
      data: idFicha,
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

