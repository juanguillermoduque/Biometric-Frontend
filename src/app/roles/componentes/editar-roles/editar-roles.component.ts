import { Component, Inject, OnInit } from '@angular/core';
import { componenteRol } from '../../component-rol';
import { rol } from '../../roles';
import { RolesService } from '../../roles.service';
import { componente } from '../../componentes';
import { MAT_DIALOG_DATA } from '@angular/material/dialog';
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

  componenteRol:componenteRol = {
    id_componente : 0,
    id_rol:0
  }

  constructor(
    private rolService:RolesService,
    @Inject(MAT_DIALOG_DATA) public data:number,
  ){}

  ngOnInit() {
    this.getRol();

  }

  getRol(){
    this.rolService.getRolId(this.data).subscribe(
      res=>{ 
        this.rolAux = res;
        this.rol.nombre_rol = this.rolAux.nombre_rol
        this.getComponentes();
      }
    )
  }

  getComponentes(){
    this.rolService.getrolComponent(this.data).subscribe(
      res=>{
        let Componentes:any = res
        for (let i = 0; i < Object.keys(Componentes).length;i++){
          this.rolService.getComponente(Componentes[i].id_componente).subscribe(
            (data)=>{
              this.idComponentes.push(Componentes[i].id_componente)
              let componente:any = data
              
              this.componentesAgregados.push(componente[0]); 
            }
          )
        }
        this.getRolesASeleccionar(Componentes);
      },
      err=>console.error(err)
    )
  }

  getRolesASeleccionar(componentesLlenados:any){
    
    for(let i = 1;i<= 7; i++){
      let cont = 0
      for(let k = 0; k < Object.keys(componentesLlenados).length;k++){
        if (componentesLlenados[k].id_componente == i){
          cont++;
        }
      }
      if(cont == 0){
        this.rolService.getComponente(i).subscribe(
          (data)=>{
            let aux:any = data;
            this.componentes.push(aux[0])
          }
        )
      }
    }
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

  editarRol(){
    this.rol.id_rol = this.data;
    if (this.rol.nombre_rol == '' || this.componentesAgregados.length <= 0){
      Swal.fire(
        {
          icon: 'error',
          title: 'Oops...',
          text: 'Hay campos sin completar',
        }
      )
  }

  else{
      this.rolService.updateRol(this.data,this.rol).subscribe(
        ()=>{
          
        },
        err=>console.error(err)
      )
      this.crearComponenteRol(this.data)
    }
  }

  crearComponenteRol(id_rol:number){
    this.componenteRol.id_rol = id_rol

    this.rolService.deleteComponentesRol(this.componenteRol.id_rol).subscribe(
      (res)=>{
        console.log(res)
      }
    )

    for(let i = 0;i <= this.idComponentes.length;i++){
      this.idComponentes;
      this.componenteRol.id_rol = id_rol
      this.componenteRol.id_componente = this.idComponentes[i]
      this.rolService.saveRolComponent(this.componenteRol).subscribe(
        res=>{
          Swal.fire({
            position: 'center',
            icon: 'success',
            title: 'El rol fue modificado exitosamente',
            showConfirmButton: false,
            timer: 1500
          })
          console.log(res)
        },
        err=>console.error(err)
      )
  }
}
}






