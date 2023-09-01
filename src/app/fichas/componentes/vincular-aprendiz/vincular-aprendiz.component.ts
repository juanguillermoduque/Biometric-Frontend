import { Component, Inject, OnInit, ViewChild } from '@angular/core';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { RolesService } from 'src/app/roles/roles.service';
import { EditarFichasComponent } from '../editar-fichas/editar-fichas.component';
import { UsuariosService } from 'src/app/usuarios/usuarios.service';
import { FormControl } from '@angular/forms';
import { debounceTime } from 'rxjs';
import { MatTable } from '@angular/material/table';
import { FichasService } from '../../fichas.service';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-vincular-aprendiz',
  templateUrl: './vincular-aprendiz.component.html',
  styleUrls: ['./vincular-aprendiz.component.css']
})
export class VincularAprendizComponent{

  constructor(
    @Inject(MAT_DIALOG_DATA) public data:any,
    public rolServices:RolesService,
    public dialogRef: MatDialogRef<EditarFichasComponent>,
    private fichasService: FichasService,
    private usuarioService: UsuariosService
  ){ }

  displayedColumns: string[] = ['NombreUsuario', 'NumeroDocumento', 'CorreoElectronico','edit'];
  aprendices:any;
  @ViewChild(MatTable) table: MatTable<any>;
  control = new FormControl();
  
  vincular(){

    this.fichasService.vincularAprendiz(this.data).subscribe(
      (res:any)=>{
        console.log(res)
        if(res.status){
          Swal.fire({
            position: 'center',
            icon: 'success',
            title: res.message,
            showConfirmButton: true
          }).then((result) => {
            if (result.isConfirmed) {
              this.dialogRef.close();
            } 
          });
        }else{
          Swal.fire({
            position: 'center',
            icon: 'error',
            title: res.message,
            showConfirmButton: true,
            timer: 1500
          })
        }
      }
    )
  }
}
