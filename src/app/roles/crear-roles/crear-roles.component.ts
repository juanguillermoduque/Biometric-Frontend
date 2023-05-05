import { Component, OnInit } from '@angular/core';
import { componente } from 'src/app/models/componentes';
import { rol } from 'src/app/models/roles';
import { RolesService } from 'src/app/services/roles/roles.service';
import { componenteRol } from 'src/app/models/component-rol';

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

  crearComponenteRol(rol:any){
    const idRol = rol.id_rol;

    for(let i = 0;i < this.idComponentes.length;i++){
      this.componenteRol.id_componente = this.idComponentes[i]
      this.componenteRol.id_rol = idRol;
      this.rolService.saveRolComponent(this.componenteRol).subscribe(
        res=>{
          console.log(res)
        },
        err=>console.error(err)
      )
  }
}
}