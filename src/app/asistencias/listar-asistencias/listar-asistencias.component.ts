import { Component } from '@angular/core';

@Component({
  selector: 'app-listar-asistencias',
  templateUrl: './listar-asistencias.component.html',
  styleUrls: ['./listar-asistencias.component.css']
})
export class ListarAsistenciasComponent {
  displayedColumns: string[] = ['fechaIngreso', 'numIngreso', 'asistio', 'noAsistio', 'aula', 'observaciones', 'horaIngreso', 'horaSalida'];

}
