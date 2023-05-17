import { Component, Inject, OnInit } from '@angular/core';
import { componenteRol } from 'src/app/models/component-rol';
import { rol } from 'src/app/models/roles';
import { RolesService } from 'src/app/services/roles/roles.service';
import { componente } from 'src/app/models/componentes';
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
    @Inject(MAT_DIALOG_DATA) public data:Number,
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
    delete this.rol.id_rol;
    if (this.rol.nombre_rol == ''){
      Swal.fire(
        {
          icon: 'error',
          title: 'Oops...',
          text: 'Hay campos sin completar',
        }
      )
  }

  else{
      this.rol.nombre_rol = this.rol.nombre_rol?.toLowerCase()
      this.rolService.saveRol(this.rol).subscribe(
        res=>{
          this.rolService.getRol(this.rol.nombre_rol).subscribe(
            res=>{
              this.crearComponenteRol(res)
            }
          )
        },
        err=>console.error(err)
      )
    }
  }

  crearComponenteRol(rol:any){
    const idRol = rol.id_rol;

    for(let i = 0;i <= this.idComponentes.length;i++){
      this.componenteRol.id_componente = this.idComponentes[i]
      this.componenteRol.id_rol = idRol;
      this.rolService.saveRolComponent(this.componenteRol).subscribe(
        res=>{
          Swal.fire({
            position: 'center',
            icon: 'success',
            title: 'El rol fue modificado exitosamente',
            showConfirmButton: false,
            timer: 1500
          })
        },
        err=>console.error(err)
      )
  }
}
}






