import { Component, OnInit } from '@angular/core';
import { FichasService } from 'src/app/services/fichas/fichas.service';
import { ficha } from 'src/app/models/fichas';
import {MatDialog, MatDialogRef} from '@angular/material/dialog';
import Swal from 'sweetalert2';
import { AgregarFichasComponent } from './agregar-fichas/agregar-fichas.component';
import { EditarFichasComponent } from './editar-fichas/editar-fichas.component';


@Component({
  selector: 'app-fichas',
  templateUrl: './fichas.component.html',
  styleUrls: ['./fichas.component.css']
})
export class FichasComponent {

  fichas:any = [];
  dataSource = this.fichas;
  
  constructor(private fichaService: FichasService,public dialog: MatDialog){
    
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

  agregarFicha(){
    this.dialog.open(AgregarFichasComponent, {
      height: '800px',
      width: '600px',
    });
  }

  editarFicha(){
    this.dialog.open(EditarFichasComponent, {
      height: '800px',
      width: '600px',
    });
  }

}
