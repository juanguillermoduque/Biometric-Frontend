import { Component } from '@angular/core';
import { MatSnackBar } from '@angular/material/snack-bar';

@Component({
  selector: 'app-reporte-asistencia',
  templateUrl: './reporte-asistencia.component.html',
  styleUrls: ['./reporte-asistencia.component.css']
})
export class ReporteAsistenciaComponent {
  numeroFicha: string = '';
  reporte: string = '';

  constructor(private _snackBar: MatSnackBar) {}

  enviarReporte() {
    if (!this.numeroFicha || !this.reporte) {
      this._snackBar.open('Por favor completa todos los campos.', 'Cerrar', {
        duration: 5000,
        horizontalPosition: 'center',
        verticalPosition: 'top'
      });
    } else {
      this.numeroFicha = '';
      this.reporte = '';
      this._snackBar.open('Reporte enviado exitosamente.', 'Cerrar', {
        duration: 5000,
        horizontalPosition: 'center',
        verticalPosition: 'top'
      });
    }
  }
}


/*
Este código es un componente de Angular que tiene un formulario para enviar un reporte de asistencia. La clase tiene dos variables
 que almacenan los valores del formulario: numeroFicha y reporte. También tiene un método llamado enviarReporte() que valida si
 ambos campos del formulario están completos. Si no están completos, muestra un mensaje de error en una barra de notificación
 utilizando el servicio MatSnackBar de Angular. Si ambos campos están completos, muestra un mensaje de éxito en la barra de
 notificación y limpia los valores de los campos del formulario.
*/
