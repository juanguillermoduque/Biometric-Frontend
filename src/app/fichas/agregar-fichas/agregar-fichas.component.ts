import { Component, OnInit } from '@angular/core';
import { ficha } from 'src/app/models/fichas';
import { FichasService } from 'src/app/services/fichas/fichas.service';

@Component({
  selector: 'app-agregar-fichas',
  templateUrl: './agregar-fichas.component.html',
  styleUrls: ['./agregar-fichas.component.css']
})
export class AgregarFichasComponent implements OnInit {

  ficha : ficha = {
    id_ficha:0,
    code_ficha:0,
    name_ficha:'',
    date_start :'',
    date_end :'',
    created_at :'',
    updated_at :'',
};

constructor(private fichasService:FichasService){

}


  ngOnInit(){

  }

  guardarFicha(){
    delete this.ficha.created_at;
    delete this.ficha.updated_at;
    delete this.ficha.id_ficha;
    delete this.ficha.date_end;
    delete this.ficha.date_start;

    this.fichasService.saveFicha(this.ficha)
      .subscribe(
        res =>{
          console.log(res);
        },
        err => console.error(err)
      )
  }

}
