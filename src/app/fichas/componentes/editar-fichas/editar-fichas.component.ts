import { Component, Inject, OnInit } from '@angular/core';
import { ficha } from '../../fichas';
import { FichasService } from '../../fichas.service';
import { MAT_DIALOG_DATA } from '@angular/material/dialog';
import Swal from 'sweetalert2'

@Component({
  selector: 'app-editar-fichas',
  templateUrl: './editar-fichas.component.html',
  styleUrls: ['./editar-fichas.component.css']
})
export class EditarFichasComponent implements OnInit {
  ficha : ficha = {
    id_ficha:0,
    code_ficha:0,
    name_ficha:'',
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


    if (this.ficha.code_ficha == 0 || this.ficha.name_ficha == '' || this.ficha.date_start == '' 
    || this.ficha.date_end == ''){
      Swal.fire(
        {
          icon: 'error',
          title: 'Oops...',
          text: 'Hay campos sin completar',
        }
      )
    }
    else{
      this.ficha.name_ficha = this.ficha.name_ficha?.toLowerCase()
      this.fichasService.updateFicha(this.idFicha,this.ficha)
        .subscribe(
          res =>{
            Swal.fire({
              position: 'center',
              icon: 'success',
              title: 'La ficha fue modificada exitosamente',
              showConfirmButton: false,
              timer: 1500
            })
            console.log(res);
          },
          err => console.error(err)
        )
    }
  }
}