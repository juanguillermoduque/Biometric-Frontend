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



