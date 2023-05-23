import { Component, Inject, OnInit } from '@angular/core';
import { ficha } from 'src/app/models/fichas';
import { FichasService } from 'src/app/services/fichas/fichas.service';
import { MAT_DIALOG_DATA } from '@angular/material/dialog';

@Component({
  selector: 'app-editar-fichas',
  templateUrl: './editar-fichas.component.html',
  styleUrls: ['./editar-fichas.component.css']
})
export class EditarFichasComponent implements OnInit {
  ficha : ficha = {
    id_ficha:0,
    code_ficha:0,
    id_programa:'',
    date_start :'',
    date_end :'',
    created_at :'',
    updated_at :'',
};

constructor(private fichasService:FichasService,
   @Inject(MAT_DIALOG_DATA) public idFicha:number
   ){}

  ngOnInit(){
    if(this.idFicha){
        this.fichasService.getFicha(this.idFicha)
          .subscribe(
            res=>{
              this.ficha = res;
              console.log(res);
            },
            err => console.error(err)
          )
    }
  }

  modificarFicha(){
    delete this.ficha.created_at;
    delete this.ficha.updated_at;
    delete this.ficha.id_ficha;
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