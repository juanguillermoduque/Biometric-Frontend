import { Component } from '@angular/core';
import { FichasService } from 'src/app/services/fichas/fichas.service';

@Component({
  selector: 'app-listar-fichas',
  templateUrl: './listar-fichas.component.html',
  styleUrls: ['./listar-fichas.component.css']
})
export class ListarFichasComponent {
  constructor(private fichaService: FichasService){

  }

  ngOnInit(){
    this.fichaService.getFichas().subscribe(
      res =>{
        console.log(res);
      },
      err=>{
        console.error(err);
      }
    )
  }

}
