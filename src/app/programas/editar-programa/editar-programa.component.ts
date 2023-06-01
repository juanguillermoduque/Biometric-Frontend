import { Component, Inject, OnInit } from '@angular/core';
import { Programa } from 'src/app/models/programas';
import { ProgramasService} from 'src/app/services/programas/programas.service';
import { MAT_DIALOG_DATA } from '@angular/material/dialog';



@Component({
  selector: 'app-editar-programa',
  templateUrl: './editar-programa.component.html',
  styleUrls: ['./editar-programa.component.css']
})
export class EditarProgramaComponent{
  programa : Programa = {
    id_programa:0,
    name_programa:'',
  };
}
