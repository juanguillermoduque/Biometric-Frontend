import { Component } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-instructor',
  templateUrl: './instructor.component.html',
  styleUrls: ['./instructor.component.css']
})
export class InstructorComponent {

  activaOpcion: number = 0;
  fichaSeleccionada: number = 0;

  constructor(private router: Router) {}

  AccionInstructor(opcion: number) {
    this.activaOpcion = opcion;
  }

  editarFicha(numeroFicha: number) {
    this.fichaSeleccionada = numeroFicha;
    this.router.navigate(['/editar-ficha', this.fichaSeleccionada]);
  }

}


/*
Este código define un componente llamado "InstructorComponent". Este componente tiene dos variables miembro: "activaOpcion" y
"fichaSeleccionada". También tiene dos métodos: "AccionInstructor()" y "editarFicha()". El método "AccionInstructor()" establece
la variable "activaOpcion" a un valor pasado como argumento. El método "editarFicha()" establece la variable "fichaSeleccionada"
a un valor pasado como argumento y navega a otra página utilizando el servicio "Router" de Angular.*/
