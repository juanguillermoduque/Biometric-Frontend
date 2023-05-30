import { Component, OnInit } from '@angular/core';
import { FichasService } from 'src/app/services/fichas/fichas.service';
import {MatDialog} from '@angular/material/dialog';
import { AgregarFichasComponent } from './agregar-fichas/agregar-fichas.component';
import { EditarFichasComponent } from './editar-fichas/editar-fichas.component';
import { query } from '@angular/animations';
import { FormControl } from '@angular/forms';
import { debounce, debounceTime } from 'rxjs';


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
    ){}
  ngOnInit(){ 
  this.getFichas();
  this.searchFicha();
  }

  getFichas(){
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
        console.log("Busqueda realizada",res);
        this.fichas = res;
      },
      err=>{console.log(err)}
    )

  }
}