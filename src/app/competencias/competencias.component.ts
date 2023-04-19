import { Component } from '@angular/core';

@Component({
  selector: 'app-competencias',
  templateUrl: './competencias.component.html',
  styleUrls: ['./competencias.component.css']
})
export class CompetenciasComponent {
  displayedColumns: string[] = ['Nombre de la competencia', 'Ficha vinculada'];
  competencias:any = ['',''];
  dataSource = this.competencias;
  }

  export interface PeriodicElement {
    competencia: string;
    ficha: number;
  }
