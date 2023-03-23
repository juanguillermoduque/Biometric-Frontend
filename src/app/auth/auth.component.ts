import { Component } from '@angular/core';
import { Router } from '@angular/router';

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

  constructor(private router: Router) {}

  onSubmit() {
    if (!this.rol || !this.documento || !this.contrasena) {
      this.mostrarError = true;
    } else {
      this.rol = '';
      this.documento = '';
      this.contrasena = '';
      this.mostrarError = false;
      this.router.navigate(['/administrador/fichas']);
    }
  }
}
