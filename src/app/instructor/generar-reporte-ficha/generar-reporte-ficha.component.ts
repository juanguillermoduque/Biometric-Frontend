import { Component } from '@angular/core';
import { MatSnackBar } from '@angular/material/snack-bar';

@Component({
  selector: 'app-generar-reporte-ficha',
  templateUrl: './generar-reporte-ficha.component.html',
  styleUrls: ['./generar-reporte-ficha.component.css']
})
export class GenerarReporteFichaComponent {
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
