import { FichasService } from 'src/app/services/fichas/fichas.service';
import { Subscription } from 'rxjs';
import { Component, OnInit } from '@angular/core';
import { ficha } from 'src/app/models/fichas';
import { ProgramasService } from 'src/app/services/programas/programas.service';
import { Programa } from 'src/app/models/programas';

@Component({
  selector: 'app-agregar-fichas',
  templateUrl: './agregar-fichas.component.html',
  styleUrls: ['./agregar-fichas.component.css']
})
export class AgregarFichasComponent  implements OnInit{

  subscription: Subscription = new Subscription();
  ficha : ficha = {
    id_ficha:0,
    code_ficha:0,
    id_programa:'',
    date_start :'',
    date_end :'',
    created_at :'',
    updated_at :'',
};

  constructor(
    private fichasService: FichasService,
    private programasService:ProgramasService
  ) {}
  
  programas: any [] = []
  agregarPrograma(programa:any){
    this.ficha.id_programa = programa.id_programa;
  }

  getPrograma(){
      this.programasService.getProgramas().subscribe(
        (data)=>{
          
          this.programas.push(data);
          console.log(this.programas)
        }
    )
  }
  ngOnInit(): void {
    this.getPrograma();
  }

  guardarFicha(): void {
    delete this.ficha.created_at;
    delete this.ficha.updated_at;
    delete this.ficha.id_ficha;
    delete this.ficha.date_end;
    delete this.ficha.date_start;
    this.subscription = this.fichasService.saveFicha(this.ficha).subscribe(
      res => {
        console.log(res);
        alert("ficha creada")
      },
      err => console.error(err)
    );
}
}