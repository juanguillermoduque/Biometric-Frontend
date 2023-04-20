import { Component } from '@angular/core';
import { Component, Inject, OnInit } from '@angular/core';
import { excusa } from 'src/app/models/excusas';
import { ExcusasService } from 'src/app/services/excusas/excusas.service';
import { ActivatedRoute,Route } from '@angular/router';
import { MAT_DIALOG_DATA } from '@angular/material/dialog';

@Component({
  selector: 'app-editar-excusas',
  templateUrl: './editar-excusas.component.html',
  styleUrls: ['./editar-excusas.component.css']
})
export class EditarExcusasComponent implements OnInit  {
  excusa : excusa = {
    id_excusa:0,
    id_asistencia:0,
    comments:'',
    archivo:'',
};
constructor(private excusasService:ExcusasService,
  private activeRouted:ActivatedRoute,
  @Inject(MAT_DIALOG_DATA) public idExcusa:number
  ){

}
  ngOnInit(){
    if(this.idExcusa){
        this.excusasService.getexcusa(this.idExcusa)
          .subscribe(
            res=>{
              console.log(res);
            },
            err => console.error(err)
          )
    }
  }

  modificarFicha(){
    
    delete this.excusa.id_excusa;
    

    this.excusasService.updateexcusa(this.idExcusa,this.excusa)
      .subscribe(
        res =>{
          console.log(res);
        },
        err => console.error(err)
      )
  }
}

