import { Component, EventEmitter, OnInit, Output } from '@angular/core';
import jwtDecode from 'jwt-decode';
import { RolesService } from 'src/app/services/roles/roles.service';
import {componente} from '../../../models/componentes'

@Component({
  selector: 'app-navegacion',
  templateUrl: './navegacion.component.html',
  styleUrls: ['./navegacion.component.css']
})
export class NavegacionComponent implements OnInit {
  idUsuario:number = 0;
  idRol:number = 0;
  usuariosRoles:any;
  componentes_roles:object = {}
  componentes:any=[];
  componenteSeleccionado:Number = 0;

  @Output()
  public seEscogioComponente :EventEmitter<Number> = new EventEmitter()

  constructor(private rolServise:RolesService){

  }

  ngOnInit(): void {
    this.getIdUsuario();
  }

  getComponentes(componentes_roles:any){
    console.log(componentes_roles)
    for(let i in componentes_roles){
      this.rolServise.getComponente(componentes_roles[i].id_componente).subscribe(
        (res)=>{
          console.log(res)
          this.componentes.push(res)
        }
      )
    }


  }

  getComponentesroles(idRol:Number){
    this.rolServise.getrolComponent(idRol).subscribe(
      (res)=>{
        this.componentes_roles = res;
        this.getComponentes(this.componentes_roles);
      }
    )
  }

  getRol(idUsuario:number){
    this.rolServise.getUsuarioRol(idUsuario).subscribe(
      (res)=>{
        this.usuariosRoles = res;
        this.idRol = this.usuariosRoles.id_rol;
        this.getComponentesroles(this.idRol);
      }
    )
  }

  getIdUsuario(){
    let tok:any = localStorage.getItem('token')
    let decode:any = jwtDecode(tok);
    this.idUsuario = decode.data[0].num_id;
    this.getRol(this.idUsuario)
  
  }
  seleccionarComponente(idComponente:Number){
    this.componenteSeleccionado = idComponente;
    this.seEscogioComponente.emit(this.componenteSeleccionado);

  }
}
