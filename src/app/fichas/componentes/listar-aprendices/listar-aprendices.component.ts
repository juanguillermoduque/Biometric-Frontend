import { Component, Inject, OnInit, ViewChild } from '@angular/core';
import { MAT_DIALOG_DATA, MatDialog, MatDialogRef } from '@angular/material/dialog';
import { RolesService } from 'src/app/roles/roles.service';
import { EditarFichasComponent } from '../editar-fichas/editar-fichas.component';
import { UsuariosService } from 'src/app/usuarios/usuarios.service';
import { FormControl } from '@angular/forms';
import { debounceTime } from 'rxjs';
import { MatTable } from '@angular/material/table';
import { FichasService } from '../../fichas.service';
import Swal from 'sweetalert2';
import { VincularAprendizComponent } from '../vincular-aprendiz/vincular-aprendiz.component';

@Component({
  selector: 'app-listar-aprendices',
  templateUrl: './listar-aprendices.component.html',
  styleUrls: ['./listar-aprendices.component.css']
})
export class ListarAprendicesComponent {

  constructor(
    @Inject(MAT_DIALOG_DATA) public data:number,
    public rolServices:RolesService,
    public dialog: MatDialog,
    public dialogRef: MatDialogRef<EditarFichasComponent>,
    private fichasService: FichasService,
    private usuarioService: UsuariosService
  ){ }

  displayedColumns: string[] = ['NombreUsuario', 'NumeroDocumento', 'CorreoElectronico','edit'];
  aprendices:any;
  @ViewChild(MatTable) table: MatTable<any>;
  control = new FormControl();
  
  ngOnInit(){
    this.getAprendices();
    this.searchUser();
  }

  getAprendices(){
    this.fichasService.getFichaAprendiz(this.data).subscribe(
      (res)=>{
        this.aprendices = res
      }
    )
  }

  findUsers(query: string){
    if (query == ""){
      this.getAprendices()
    }

    this.usuarioService.searchUsuario(query).subscribe(
      (res:any)=>{

        let aux = res;
        this.aprendices = aux[0];
        this.table.renderRows();

      },
      err=>{console.error(err)}
    )
  }

  searchUser(){

    this.control.valueChanges.pipe(
      debounceTime(500)
    ).subscribe(query => {

      this.findUsers(query)
    })

  }

  vincular(){
    let vinculacion = {
      id_aprendiz : 0,
      id_ficha : this.data
    }

    this.dialog.open(VincularAprendizComponent, {
      height: '400px',
      width: '400px',
      data: vinculacion,
    }).afterClosed().subscribe(() => {
      this.getAprendices();
    });
  }

  desvincular(id:number){
    let vinculacion = {
      id_aprendiz : id,
      id_ficha : this.data
    }
    this.fichasService.desvincularAprendiz(vinculacion).subscribe(
      (res:any)=>{
        if(res.status){
          Swal.fire({
            position: 'center',
            icon: 'success',
            title: res.message,
            showConfirmButton: true,
            timer: 1500
          })
          this.getAprendices();
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
