import { Component, OnInit } from '@angular/core';
import { FichasService } from 'src/app/services/fichas/fichas.service';
import { ficha } from 'src/app/models/fichas';

@Component({
  selector: 'app-listar-fichas',
  templateUrl: './listar-fichas.component.html',
  styleUrls: ['./listar-fichas.component.css']
})
export class ListarFichasComponent implements OnInit {
  displayedColumns: string[] = ['id', 'programa', 'trimestre', 'jornada',  'inicio', 'fin','lider'];
  fichas:any = [];
  dataSource = this.fichas;

  constructor(private fichaService: FichasService){
    
  }

  ngOnInit(){
    this.fichaService.getFichas().subscribe(
      res =>{
        this.fichas = res;
        console.log(this.fichas);
      },
      err=>console.error(err)
    )
  }

}
