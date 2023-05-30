import { FichasService } from 'src/app/services/fichas/fichas.service';
import { Subscription } from 'rxjs';
import { Component, OnInit } from '@angular/core';
import { ficha } from 'src/app/models/fichas';
import { ProgramasService } from 'src/app/services/programas/programas.service';
import { Programa } from 'src/app/models/programas';
import Swal from 'sweetalert2'

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

    if (this.ficha.code_ficha == 0 || this.ficha.id_programa == '' || this.ficha.date_start == '' 
    || this.ficha.date_end == ''){
      Swal.fire(
        {
          icon: 'error',
          title: 'Oops...',
          text: 'Hay campos sin completar',
        }
      )
      this.ficha.code_ficha=0
      this.ficha.id_programa= ''
      this.ficha.date_start= ''
      this.ficha.date_end= ''
    }
    else{
      this.ficha.id_programa = this.ficha.id_programa?.toLowerCase()
      this.subscription = this.fichasService.saveFicha(this.ficha).subscribe(

        res => {
          Swal.fire({
            position: 'center',
            icon: 'success',
            title: 'La ficha fue agregada exitosamente',
            showConfirmButton: false,
            timer: 1500
          })
          console.log(res);
        },
        err => console.error(err)
      );
    }
}
}