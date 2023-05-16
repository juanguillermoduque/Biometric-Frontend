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
  idComponentes:number[] = []
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
    this.getComponentes();
    this.getRol();
    this.rol = this.rolAux
    

  }

  getRol(){
    this.rolService.getRolId(this.data).subscribe(
      res=>{ 
        this.rolAux = res;
        console.log(res)
      }
    )
  }

  getComponentes(){
    this.rolService.getComponentes().subscribe(
      res=>{
        this.componentes = res;
      },
      err=>console.error(err)
    )
  }

  agregarComponente(componente:componente){
    this.componentesAgregados.push(componente);
    this.componentes[0].splice(this.componentes[0].indexOf(componente) , 1);
    this.idComponentes.push(componente.id_componente);
  }
  quitarComponente(componente:componente){
    this.componentes[0].push(componente);
    this.componentesAgregados.splice(this.componentesAgregados.indexOf(componente),1);
    this.idComponentes.splice(this.idComponentes.indexOf(componente.id_componente,1));
  }

  crearRol(){
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
          console.log(res)
        },
        err=>console.error(err)
      )
  }
}
}






