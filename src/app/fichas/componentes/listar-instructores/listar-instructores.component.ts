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
import { VincularInstructorComponent } from '../vincular-instructor/vincular-instructor.component';

@Component({
  selector: 'app-listar-instructores',
  templateUrl: './listar-instructores.component.html',
  styleUrls: ['./listar-instructores.component.css']
})
export class ListarInstructoresComponent {
  
  constructor(
    @Inject(MAT_DIALOG_DATA) public data:number,
    public rolServices:RolesService,
    public dialog: MatDialog,
    public dialogRef: MatDialogRef<EditarFichasComponent>,
    private fichasService: FichasService,
    private usuarioService: UsuariosService
  ){ }

  displayedColumns: string[] = ['NombreUsuario', 'NumeroDocumento', 'CorreoElectronico','edit'];
  instructores:any;
  @ViewChild(MatTable) table: MatTable<any>;
  control = new FormControl();
  
  ngOnInit(){
    this.getInstructores();
    this.searchUser();
  }

  getInstructores(){
    this.fichasService.getFichaInstructor(this.data).subscribe(
      (res)=>{
        console.log(res)
        this.instructores = res
      }
    )
  }

  findUsers(query: string){
    if (query == ""){
      this.getInstructores()
    }
    this.usuarioService.searchUsuario(query).subscribe(
      (res:any)=>{
        let aux = res;
        this.instructores = aux[0];
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
      id_instructor : 0,
      id_ficha : this.data
    }
    this.dialog.open(VincularInstructorComponent, {
      height: '400px',
      width: '400px',
      data: vinculacion,
    }).afterClosed().subscribe(() => {
      this.getInstructores();
    });
  }

  desvincular(id:number){
    let vinculacion = {
      id_instructor : id,
      id_ficha : this.data
    }
    this.fichasService.desvincularInstructor(vinculacion).subscribe(
      (res:any)=>{
        console.log(res)
        if(res.status){
          Swal.fire({
            position: 'center',
            icon: 'success',
            title: res.message,
            showConfirmButton: true,
            timer: 1500
          })
          this.getInstructores();
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
