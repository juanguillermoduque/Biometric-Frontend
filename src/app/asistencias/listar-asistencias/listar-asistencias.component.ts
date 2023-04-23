import { Component } from '@angular/core';
import { AsistenciasService } from 'src/app/services/asistencias/asistencias.service';

@Component({
  selector: 'app-listar-asistencias',
  templateUrl: './listar-asistencias.component.html',
  styleUrls: ['./listar-asistencias.component.css']
})
export class ListarAsistenciasComponent {
  displayedColumns: string[] = ['fechaIngreso', 'numIngreso', 'asistio', 'noAsistio', 'aula', 'observaciones', 'horaIngreso', 'horaSalida'];
  asistencias:any = [];
  dataSource = this.asistencias;

  constructor(private asistenciaService:AsistenciasService){

  }

  ngOnInit(){
    this.asistenciaService.getAsistencias().subscribe(
      res =>{
        this.asistencias = res;
        console.log(this.asistencias);
      },
      err=>console.error(err)
    )
  }

}

/*Este es un componente de Angular que muestra una lista de asistencias. El componente recupera la lista de asistencias desde el
servicio de AsistenciasService utilizando el método getAsistencias(), y luego muestra los datos en una tabla utilizando la
directiva mat-table de Angular Material. La lista de asistencias se almacena en la propiedad asistencias del componente y se
asigna a la propiedad dataSource de la tabla. La estructura de la tabla se define utilizando las propiedades displayedColumns y
matColumnDef de la directiva mat-table.*/
