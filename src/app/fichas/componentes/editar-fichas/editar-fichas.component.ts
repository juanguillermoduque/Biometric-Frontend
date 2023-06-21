import { Component, Inject, OnInit } from '@angular/core';
import { ficha } from '../../fichas';
import { FichasService } from '../../fichas.service';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import Swal from 'sweetalert2'
import { ProgramasService } from 'src/app/programas/programas.service';

@Component({
  selector: 'app-editar-fichas',
  templateUrl: './editar-fichas.component.html',
  styleUrls: ['./editar-fichas.component.css']
})
export class EditarFichasComponent implements OnInit {
  ficha : ficha = {
    code_ficha:0,
    id_programa:'',
    estado:'',
    name_programa: "",
};

constructor(private fichasService:FichasService,
   @Inject(MAT_DIALOG_DATA) public idFicha:number,
   public programaService:ProgramasService,
   public dialogRef: MatDialogRef<EditarFichasComponent>
   ){}

   programas: any [] = []
   agregarPrograma(programa:any){
     this.ficha.id_programa = programa.id_programa;
   }
 
   getPrograma(){
       this.programaService.getProgramas().subscribe(
         (data)=>{
           this.programas.push(data);
         }
     )
   }
   getFicha (){
    this.fichasService.getFicha(this.idFicha)
    .subscribe(
      res=>{
        this.ficha = res;
        console.log(this.ficha);
      },
      err => console.error(err)
    ) 
  }

  ngOnInit(){
    this.getFicha();
    this.getPrograma();
  }

  modificarFicha(){
    delete this.ficha.name_programa;
    if (this.ficha.code_ficha == 0 || this.ficha.id_programa == '' ){
      Swal.fire(
        {
          icon: 'error',
          title: 'Oops...',
          text: 'Hay campos sin completar',
        }
      )
    }
    else{
      this.fichasService.updateFicha(this.idFicha,this.ficha).subscribe(
        res =>{
          Swal.fire({
            position: 'center',
            icon: 'success',
            title: 'La ficha fue editada exitosamente',
            showConfirmButton: true,
            timer: 1500
          }).then((result) => {
            if (result.isConfirmed) {
              this.dialogRef.close();
            } 
          });
        },
        err => console.error(err)
      )
    }
  }
}