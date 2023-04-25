import { Component } from '@angular/core';

@Component({
  selector: 'app-auth',
  templateUrl: './auth.component.html',
  styleUrls: ['./auth.component.css']
})
export class AuthComponent {
  documento: string = '';
  contrasena: string = '';

  constructor(){}

  logearse() {
    if (!this.documento || !this.contrasena) {
      
    } else {
      this.documento = '';
      this.contrasena = '';
    }
  }
}
