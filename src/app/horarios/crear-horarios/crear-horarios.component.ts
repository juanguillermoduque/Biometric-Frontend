import { Component, OnInit } from '@angular/core';
import { horario } from 'src/app/models/horarios';
import { HorariosService } from 'src/app/services/horarios/horarios.service';
import { RolesService } from 'src/app/services/roles/roles.service';
import { UsuariosService } from 'src/app/services/usuarios/usuarios.service';

@Component({
  selector: 'app-crear-horarios',
  templateUrl: './crear-horarios.component.html',
  styleUrls: ['./crear-horarios.component.css']
})
export class CrearHorariosComponent implements OnInit{ 
  horario : horario = {
    id_instructor:0,
    jornada: '',
    id_ficha: 0,
    date_start: '',
    date_end: '',
    created_at: '',
    updated_at: '',
  };

  instructores:any = [];
  instructoresIdRol:any[]= []
  instructoresId:any[]= []
  
  constructor(private horarioService:HorariosService, private rolesService:RolesService, 
  private usuariosService:UsuariosService){}

  guardarHorario(){
    delete this.horario.created_at;
    delete this.horario.updated_at;
    console.log(this.horario);

    this.horarioService.saveHorario(this.horario).subscribe(
      res =>{
        console.log(res);
      },
      err => console.error(err)
    )
}

  ngOnInit(): void {
    this.getIdUsuario();
  }
  getIdUsuario(){
    this.rolesService.searchInstructores().subscribe(
      (instructores) => {
        this.instructoresIdRol.push(instructores);
        this.getUsuario();

      }
    );
  }
  getUsuario(){
    for(let i = 0; i < this.instructoresIdRol.length; i++){
      this.instructoresId.push(this.instructoresIdRol[i].id_usuario)
    }
    this.getInstructor();
  }

  getInstructor(){
    for(let i = 0; i < this.instructoresId.length; i++){
      this.usuariosService.getUsuario(this.instructoresId[i]).subscribe(
        (data)=>{
          this.instructores.push(data);
        }
      )

    }
    console.log(this.instructores)
  }

}
