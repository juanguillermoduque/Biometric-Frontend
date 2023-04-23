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
      const rolSeleccionado = this.rol;
      this.rol = '';
      this.documento = '';
      this.contrasena = '';
      switch (rolSeleccionado) {
        case 'administrador':
          this.router.navigateByUrl('/administrador');
          break;
        case 'instructor':
          this.router.navigateByUrl('/instructor');
          break;
        case 'aprendiz':
          this.router.navigateByUrl('/aprendiz');
          break;
        default:
          this._snackBar.open('Selecciona un rol válido.', 'Cerrar', {
            duration: 5000,
            horizontalPosition: 'center',
            verticalPosition: 'top'
          });
          break;
      }
    }
  }

}
/*
Este código es un componente de Angular que maneja la lógica del formulario de inicio de sesión. Tiene un método "logearse"
que valida si los campos del formulario están completos y, si es así, redirecciona al usuario según el rol seleccionado. Si algún
campo está vacío, muestra un mensaje de error con MatSnackBar de Angular. También tiene algunas propiedades para almacenar los
valores de los campos del formulario y una variable "mostrarError" que se utiliza para controlar la visualización de un mensaje de
error en la vista.*/
