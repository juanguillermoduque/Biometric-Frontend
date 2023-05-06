import { Component, OnInit } from '@angular/core';
import { horario } from 'src/app/models/horarios';
import { HorariosService } from 'src/app/services/horarios/horarios.service';
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

  instructores = [];
  
  constructor(private horarioService:HorariosService, private usuariosService:UsuariosService){}

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
    this.usuariosService.searchInstructores().subscribe(
      instructores => {console.log(instructores)}
    );
  }

}
