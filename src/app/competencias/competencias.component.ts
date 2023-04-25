import { Component, OnInit } from '@angular/core';
import { CompetenciasService } from '../services/competencias/competencias.service';
import { competencia } from '../models/competencias';
import { MatDialog, MatDialogRef } from '@angular/material/dialog';
import { CrearCompetenciasComponent } from './crear-competencias/crear-competencias.component';
import { EditarCompetenciasComponent } from './editar-competencias/editar-competencias.component';

@Component({
  selector: 'app-competencias',
  templateUrl: './competencias.component.html',
  styleUrls: ['./competencias.component.css']
})
export class CompetenciasComponent implements OnInit{
  displayedColumns: string[] = ['Nombre de la competencia', 'Ficha vinculada'];
  competencias:any = [];
  dataSource = this.competencias;

  constructor(private CompetenciaService: CompetenciasService, public dialog:MatDialog){

  }

  ngOnInit(){
    this.CompetenciaService.getCompetencias().subscribe(
      res =>{
        this.competencias = res;
        console.log(this.competencias);
      },
      err=>console.error(err)
    )
  }

  nuevaCompetencia(){
    this.dialog.open(CrearCompetenciasComponent,{
      width: '1000px',
      height: '1000px',
    })
  }

  editarCompetencias(num_id : number){
    this.dialog.open(EditarCompetenciasComponent,{
      width: '800px',
      height: '600px',
      data: num_id
    })

  }

  }
