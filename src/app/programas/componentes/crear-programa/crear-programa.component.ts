import { Component, OnInit } from '@angular/core';
import { Programa } from '../../programas';
import { ProgramasService } from '../../programas.service';
import { Subscription } from 'rxjs';

@Component({
  selector: 'app-crear-programa',
  templateUrl: './crear-programa.component.html',
  styleUrls: ['./crear-programa.component.css']
})
export class CrearProgramaComponent {

  programa : Programa = {
    id_programa:0,
    name_programa:'',
  }

  constructor(private programasService: ProgramasService,) 
  {}

  ngOnInit(): void {}


  guardarPrograma(): void {
    delete this.programa.name_programa;
    this.programasService.savePrograma(this.programa).subscribe(
      res => {
        alert("programa creado")
      },
      err => console.error(err)
    );
 
}
}
