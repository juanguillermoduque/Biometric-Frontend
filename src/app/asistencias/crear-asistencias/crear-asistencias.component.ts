import { Component, OnInit } from '@angular/core';
import { asistencia } from 'src/app/models/asistencia';
import { AsistenciasService } from 'src/app/services/asistencias/asistencias.service';

@Component({
  selector: 'app-crear-asistencias',
  templateUrl: './crear-asistencias.component.html',
  styleUrls: ['./crear-asistencias.component.css']
})
export class CrearAsistenciasComponent implements OnInit{

  asistencia: asistencia ={
    idasistencia:0 ,
    iduser: 0,
    date_enter:'',
    date_start:'',
    date_end:'',
    aula:0,
    Estado:'',
    comments:'',
    created_at :'',
    updated_at :'',
  };

  constructor(private asistenciasService:AsistenciasService){

  }


  ngOnInit(){

  }
  guardarAsistencia(){
    delete this.asistencia.created_at;
    delete this.asistencia.updated_at;
    delete this.asistencia.date_enter;
    delete this.asistencia.date_start;
    delete this.asistencia.date_end;
    delete this.asistencia.Estado;
    delete this.asistencia.aula;
    delete this.asistencia.idasistencia;

  this.asistenciasService.saveAsistencia(this.asistencia)
      .subscribe(
        res =>{
          console.log(res);
        },
        err => console.error(err)
      )
    }


}

/*Este código es un archivo TypeScript que importa dos cosas: el componente y un servicio de asistencia. El componente define una
clase con un atributo "asistencia" que se inicializa como un objeto vacío con varios campos. También tiene un constructor que
inyecta el servicio de asistencia y un método "guardarAsistencia()" que elimina algunos campos del objeto "asistencia" y llama
a una función "saveAsistencia()" del servicio de asistencia para guardar la asistencia en algún lugar. El método "ngOnInit()"
está vacío y no hace nada.*/
