import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { MatSnackBar } from '@angular/material/snack-bar';

@Component({
  selector: 'app-auth',
  templateUrl: './auth.component.html',
  styleUrls: ['./auth.component.css']
})
export class AuthComponent {
  rol: string = '';
  documento: string = '';
  contrasena: string = '';
  mostrarError: boolean = false;

  constructor(
    private router: Router,
    private _snackBar: MatSnackBar
  ) {}

  logearse() {
    if (!this.rol || !this.documento || !this.contrasena) {
      this._snackBar.open('Por favor completa todos los campos.', 'Cerrar', {
        duration: 5000,
        horizontalPosition: 'center',
        verticalPosition: 'top'
      });
    } else {
      this.mostrarError = false;
      this.rol = '';
      this.documento = '';
      this.contrasena = '';
      this.router.navigateByUrl('/main');
    }
  }
}
