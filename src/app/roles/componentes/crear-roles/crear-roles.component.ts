import { Component, OnInit } from '@angular/core';
import { componente } from '../../componentes';
import { rol } from '../../roles';
import { RolesService } from '../../roles.service';
import { componenteRol } from '../../component-rol';
import Swal from 'sweetalert2'
import { MatDialogRef } from '@angular/material/dialog';

@Component({
  selector: 'app-crear-roles',
  templateUrl: './crear-roles.component.html',
  styleUrls: ['./crear-roles.component.css']
})
export class CrearRolesComponent implements OnInit{

  componentes:any = [];
  componentesAgregados:any= []
  idComponentes:number[] = []

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
    public dialogRef: MatDialogRef<CrearRolesComponent>
  ){}

  ngOnInit() {
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
      this.rolService.saveRol(this.rol).subscribe(
        res=>{
          this.rolService.getRol(this.rol.nombre_rol).subscribe(
            res=>{
              this.crearComponenteRol(res);
              Swal.fire({
                position: 'center',
                icon: 'success',
                title: 'El rol fue creado exitosamente',
                showConfirmButton: false,
                timer: 1500
              }).then((result) => {
                if (result.isConfirmed) {
                  this.dialogRef.close();
                } 
              });
            },
            err=>{
              Swal.fire(
                {
                  icon: 'error',
                  title: 'Oops...',
                  text: 'Algo salio mal',
                }
              )
            }
          )
        },
        err=>{
          Swal.fire(
            {
              icon: 'error',
              title: 'Oops...',
              text: 'El Rol ya existe',
            }
          )
        }
      )
    }
  }

  crearComponenteRol(rol:any){
    const idRol = rol.id_rol;

    for(let i = 0;i < this.idComponentes.length;i++){
      this.componenteRol.id_componente = this.idComponentes[i]
      this.componenteRol.id_rol = idRol;
      this.rolService.saveRolComponent(this.componenteRol).subscribe(
        res=>{

        },
        err=>console.error(err)
      )
  }
}
}
