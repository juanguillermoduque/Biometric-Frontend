import { Component } from '@angular/core';

@Component({
  selector: 'app-auth',
  templateUrl: './auth.component.html',
  styleUrls: ['./auth.component.css']
})
export class AuthComponent {

  rol: string = '';
  documento: string = '';
  contrasena: string = '';
  mostrarError = false;

  constructor() {}

  onSubmit() {
    if (!this.rol || !this.documento || !this.contrasena) {
      this.mostrarError = true;
      
    } else {
      // Aquí puedes agregar la lógica para enviar los datos del formulario
      this.rol = '';
      this.documento = '';
      this.contrasena = '';
      this.mostrarError = false;
    }
  }
}

