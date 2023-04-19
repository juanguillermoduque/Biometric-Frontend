import { Component } from '@angular/core';

@Component({
  selector: 'app-excusas',
  templateUrl: './excusas.component.html',
  styleUrls: ['./excusas.component.css']
})
export class ExcusasComponent {
  displayedColumns: string[] = ['N°', 'Fecha', 'Instructor/a', 'Estado'];
  excusas:any = ['','','','','',''];
  dataSource = this.excusas;
  }

  export interface PeriodicElement {
    numero: number;
    fecha: string;
    instructor: string;
    estado: string;
  }
  
  const ELEMENT_DATA: PeriodicElement[] = [
    {numero: 1, fecha: '29/03/2023', instructor: 'Wilson Ramírez', estado: 'Validado'},
  ]  

