import { Component } from '@angular/core';
import { MatSnackBar } from '@angular/material/snack-bar';

@Component({
  selector: 'app-generar-reportes',
  templateUrl: './generar-reportes.component.html',
  styleUrls: ['./generar-reportes.component.css']
})
export class GenerarReportesComponent {
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
