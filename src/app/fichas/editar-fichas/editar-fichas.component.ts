import { Component, Inject, OnInit } from '@angular/core';
import { ficha } from 'src/app/models/fichas';
import { FichasService } from 'src/app/services/fichas/fichas.service';
import { ActivatedRoute,Route } from '@angular/router';
import { MAT_DIALOG_DATA } from '@angular/material/dialog';

@Component({
  selector: 'app-editar-fichas',
  templateUrl: './editar-fichas.component.html',
  styleUrls: ['./editar-fichas.component.css']
})
export class EditarFichasComponent implements OnInit {
  ficha : ficha = {
    idficha:0,
    code_ficha:0,
    name_ficha:'',
    trimester:0,
    num_Students:0,
    jornada :'',
    date_start :'',
    date_end :'',
    created_at :'',
    updated_at :'',
};
params = this.activeRouted.snapshot.params;

constructor(private fichasService:FichasService,
   private activeRouted:ActivatedRoute,
   @Inject(MAT_DIALOG_DATA) public idFicha:number
   ){

}
  ngOnInit(){
    if(this.idFicha){
        this.fichasService.getFicha(this.idFicha)
          .subscribe(
            res=>{
              console.log(res);
            },
            err => console.error(err)
          )
    }
  }

  modificarFicha(){
    delete this.ficha.created_at;
    delete this.ficha.updated_at;
    delete this.ficha.idficha;
    delete this.ficha.date_end;
    delete this.ficha.date_start;

    this.fichasService.updateFicha(this.idFicha,this.ficha)
      .subscribe(
        res =>{
          console.log(res);
        },
        err => console.error(err)
      )
  }
}
