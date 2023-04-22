import { Component, OnInit } from '@angular/core';
import { excusa } from 'src/app/models/excusas';
import { ExcusasService } from 'src/app/services/excusas/excusas.service';

@Component({
  selector: 'app-crear-excusa',
  templateUrl: './crear-excusa.component.html',
  styleUrls: ['./crear-excusa.component.css']
})
export class CrearExcusaComponent implements OnInit {

  excusa : excusa = {
    id_excusa:0,
    id_asistencia:0,
    comments:'',
    archivo:'',
};

constructor(private excusasService:ExcusasService){

}

  ngOnInit(){

  }

  guardarExcusa(){

    delete this.excusa.id_excusa;
   

    this.excusasService.saveexcusa(this.excusa)
      .subscribe(
        res =>{
          console.log(res);
        },
        err => console.error(err)
      )
  }

}
