import { Component, OnInit } from '@angular/core';
import { FichasService } from '../../fichas.service';
import {MatDialog} from '@angular/material/dialog';
import { AgregarFichasComponent } from '../agregar-fichas/agregar-fichas.component';
import { EditarFichasComponent } from '../editar-fichas/editar-fichas.component';
import { query } from '@angular/animations';
import { FormControl } from '@angular/forms';
import { debounce, debounceTime } from 'rxjs';
import { MatTableDataSource } from '@angular/material/table';
import { ExportService } from 'src/app/utils/export/export.service';


@Component({
  selector: 'app-fichas',
  templateUrl: './fichas.component.html',
  styleUrls: ['./fichas.component.css']
})
export class FichasComponent implements OnInit {
  fichas:any = [];
  dataSource = this.fichas;
  control = new FormControl();

  constructor(
    private fichaService: FichasService,
    public dialog: MatDialog,
    private exportService:ExportService
    ){}
  ngOnInit(){ 
  this.getFichas();
  this.searchFicha();
  }

  getFichas(){
    this.fichaService.getFichas().subscribe(
      res =>{
        this.fichas = res;
      },
      err=>console.error(err)
    ) 
  }
  agregarFicha(){
    this.dialog.open(AgregarFichasComponent, {
      height: '400px',
      width: '400px',
      panelClass: 'custom-dialog-create-update'
    }).afterClosed().subscribe(result => {
      this.getFichas();
    });
  }

  editarFicha(idFicha :number){
    this.dialog.open(EditarFichasComponent, {
      height: '400px',
      width: '400px',
      panelClass: 'custom-dialog-create-update',
      data: idFicha,
    }).afterClosed().subscribe(result => {
      this.getFichas();
    });
  }

  searchFicha(){

    this.control.valueChanges.pipe(
      debounceTime(500)
    ).subscribe(query => {
  
      this.findFichas(query)
    })
  }

  findFichas(query:string){
      if (query == ""){
        this.getFichas()
      }
    
      this.fichaService.search(query).subscribe(
      res=>{
        this.fichas = res;
      },
      err=>{console.log(err)}
    )

  }

  ExportarFichas(){
    let fichas = this.fichas[0];
    for (let i =0; i< fichas.length;i++){
      delete fichas[i].id_ficha;
      delete fichas[i].id_programa;
      delete fichas[i].created_at;
      delete fichas[i].updated_at;
    }
    let dataSourse = new MatTableDataSource(fichas)

    this.exportService.exportExcel(dataSourse.data,"fichas")
  
}
}