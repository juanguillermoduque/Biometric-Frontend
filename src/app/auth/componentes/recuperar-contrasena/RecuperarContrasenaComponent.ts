import { Component } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { ConfirmacionComponent } from '../confirmacion/confirmacion.component';


@Component({
  selector: 'app-recuperar-contrasena',
  templateUrl: './recuperar-contrasena.component.html',
  styleUrls: ['./recuperar-contrasena.component.css']
})
export class RecuperarContrasenaComponent {

  constructor(public dialog:MatDialog){
    
  }

  mensajeEmail(){
    this.dialog.open(ConfirmacionComponent,{
      width:"500px",
      height:"400px",
    })
  }
}
