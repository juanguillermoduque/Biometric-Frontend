import { Component, OnInit } from '@angular/core';
import { FichasService } from '../../fichas.service';
import {MatDialog} from '@angular/material/dialog';
import { FormControl } from '@angular/forms';
import { debounceTime } from 'rxjs';
import { MatTableDataSource } from '@angular/material/table';
import { ExportService } from 'src/app/utils/export/export.service';


@Component({
  selector: 'app-fichas-instructor',
  templateUrl: './fichas-instructor.component.html',
  styleUrls: ['./fichas-instructor.component.css']
})
export class FichasInstructorComponent implements OnInit {
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
