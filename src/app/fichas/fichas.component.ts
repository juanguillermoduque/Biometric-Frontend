import { Component, OnInit } from '@angular/core';
import { FichasService } from 'src/app/services/fichas/fichas.service';
import { ficha } from 'src/app/models/fichas';
import {MatDialog, MatDialogRef} from '@angular/material/dialog';
import { AgregarFichasComponent } from './agregar-fichas/agregar-fichas.component';
import { EditarFichasComponent } from './editar-fichas/editar-fichas.component';


@Component({
  selector: 'app-fichas',
  templateUrl: './fichas.component.html',
  styleUrls: ['./fichas.component.css']
})
export class FichasComponent implements OnInit {

  fichas:any = [];
  dataSource = this.fichas;

  constructor(
    private fichaService: FichasService,
    public dialog: MatDialog,
  ) {}

  ngOnInit() {
    this.fichaService.getFichas().subscribe(
      res => {
        this.fichas = res;
        console.log(this.fichas);
      },
      err => console.error(err)
    )
  }

agregarFicha() {
    const ref = this.dialog.open(AgregarFichasComponent, {
      height: '500px',
      width: '850px',
    });

    ref.afterClosed().subscribe(result =>{
      console.log('resultado del dialogo:', result);
      this.actualizarFichas();
    });
  }

  editarFicha(idFicha: number) {
    this.dialog.open(EditarFichasComponent, {
      height: '800px',
      width: '600px',
      data: idFicha,
    });
  }

  actualizarFichas(): void {
    this.fichaService.getFichas().subscribe(
      (res: any) => { // Se cambia el tipo de datos a any
        this.fichas = res;
        console.log(this.fichas);
      },
      err => console.error(err)
    );
  }
}

/*Este código es un componente Angular llamado "FichasComponent". En el ngOnInit(), se llama al método "getFichas()" del servicio
"FichasService" para obtener una lista de fichas y se almacena en la variable "fichas". Luego, hay dos métodos, "agregarFicha()" y
 "editarFicha()", que abren un diálogo para agregar o editar una ficha, respectivamente. El método "actualizarFichas()" se utiliza
 para actualizar la lista de fichas después de agregar o editar una ficha. Finalmente, se exporta la clase "FichasComponent".*/
