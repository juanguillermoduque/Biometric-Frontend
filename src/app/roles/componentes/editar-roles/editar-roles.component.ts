import { AfterViewInit, Component, Inject, OnInit } from '@angular/core';
import { componenteRol } from '../../component-rol';
import { rol } from '../../roles';
import { RolesService } from '../../roles.service';
import { componente } from '../../componentes';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import Swal from 'sweetalert2'
//FALTA AGREGAR ID POR MEDIO DE MAT_DIALOG
@Component({
  selector: 'app-editar-roles',
  templateUrl: './editar-roles.component.html',
  styleUrls: ['./editar-roles.component.css']
})
export class EditarRolesComponent implements OnInit{
  
  componentes:any = [];
  componentesAgregados:any= []
  idComponentes:any[] = []
  rolAux:any = {}

  rol:rol={
    id_rol : 0,
    nombre_rol: '',
  }

  constructor(
    private rolService:RolesService,
    @Inject(MAT_DIALOG_DATA) public data:number,
    public dialogRef: MatDialogRef<EditarRolesComponent>
  ){}

  ngOnInit() {
    this.getRol();
  }

  getRol(){
    this.rolService.getRolId(this.data).subscribe(
      (res:any)=>{
        
        this.rolService.getComponentesByRol(res.id_rol).subscribe(
          data =>{
          }
        )
      }
    )
  }

  editarRol(){

  }

  agregarComponente(componente:componente){
    this.componentesAgregados.push(componente);
    this.componentes.splice(this.componentes.indexOf(componente) , 1);
    this.idComponentes.push(componente.id_componente);
  }

  quitarComponente(componente:componente){
    this.componentes.push(componente);
    this.componentesAgregados.splice(this.componentesAgregados.indexOf(componente),1);
    this.idComponentes.splice(this.idComponentes.indexOf(componente.id_componente,1));
  }

}







