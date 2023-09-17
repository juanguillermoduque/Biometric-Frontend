import { FichasService } from '../../fichas.service';
import { Subscription } from 'rxjs';
import { Component, OnInit } from '@angular/core';
import { ProgramasService } from '../../../programas/programas.service';
import { Programa } from '../../../programas/programas';
import { ficha } from '../../fichas';
import Swal from 'sweetalert2'
import { MatDialogRef } from '@angular/material/dialog';

@Component({
  selector: 'app-agregar-fichas',
  templateUrl: './agregar-fichas.component.html',
  styleUrls: ['./agregar-fichas.component.css']
})
export class AgregarFichasComponent  implements OnInit{

  subscription: Subscription = new Subscription();
  ficha : ficha = {
    code_ficha:undefined,
    id_programa:'',
    created_at :'',
    updated_at :'',
};

  constructor(
    private fichasService: FichasService,
    private programasService:ProgramasService,
    public dialogRef: MatDialogRef<AgregarFichasComponent>
  ) {}
  
  programas: any [] = []
  agregarPrograma(programa:any){
    this.ficha.id_programa = programa.id_programa;
  }

  getPrograma(){
      this.programasService.getProgramas().subscribe(
        (data)=>{
          this.programas.push(data);
        }
    )
  }
  ngOnInit(): void {
    this.getPrograma();
  }

  guardarFicha(): void {
    delete this.ficha.created_at;
    delete this.ficha.updated_at;

    if (this.ficha.code_ficha == 0 || this.ficha.id_programa == ''){
      Swal.fire(
        {
          icon: 'error',
          title: 'Oops...',
          text: 'Hay campos sin completar',
        }
      )
    }
    else{

      this.fichasService.saveFicha(this.ficha).subscribe(
        res => {
          Swal.fire({
            position: 'center',
            icon: 'success',
            title: 'La ficha fue agregada exitosamente',
            showConfirmButton: true,
            timer: 1500
          }).then((result) => {
            if (result.isConfirmed) {
              this.dialogRef.close();
            } 
          });
        },
        err => console.error(err)
      );
    }
}
}