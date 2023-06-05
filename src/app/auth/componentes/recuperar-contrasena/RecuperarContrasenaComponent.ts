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

  documento = 0
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
        else{

        }
        console.log(data)
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
