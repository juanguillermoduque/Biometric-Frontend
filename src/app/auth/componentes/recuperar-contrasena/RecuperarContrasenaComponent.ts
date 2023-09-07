import { Component } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { ConfirmacionComponent } from '../confirmacion/confirmacion.component';
import { AuthService } from '../../auth.service';


@Component({
  selector: 'app-recuperar-contrasena',
  templateUrl: './recuperar-contrasena.component.html',
  styleUrls: ['./recuperar-contrasena.component.css']
})
export class RecuperarContrasenaComponent {

  documento:number;
  constructor(public dialog:MatDialog,
    public authService:AuthService){
    
  }

  recuperar(){
    this.authService.recoveryPassword(this.documento).subscribe(
      data=>{
        let aux:any = data;
        if(aux.ok ){
          this.mensajeEmail()
        }
      }
    )
  }

  mensajeEmail(){
    this.dialog.open(ConfirmacionComponent,{
      height: '350px',
      width: '400px',
    })
  }
}
