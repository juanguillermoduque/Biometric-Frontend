import { Component } from '@angular/core';
import jwtDecode from 'jwt-decode';
import Swal from 'sweetalert2';
import { UsuariosService } from '../../usuarios.service';

@Component({
  selector: 'app-cambiar-contrasena',
  templateUrl: './cambiar-contrasena.component.html',
  styleUrls: ['./cambiar-contrasena.component.css']
})
export class CambiarContrasenaComponent {

  contrasenaActual : string
  contrasenaNueva : string
  confirmarContrasenaNueva : string
  num_id : number

  constructor(private usuariosService:UsuariosService

    ){
    
  }

  actualizarPassword(){
    this.getId()
    if (this.contrasenaNueva == this.confirmarContrasenaNueva){
      this.usuariosService.updatePassword(this.num_id, this.contrasenaNueva, this.contrasenaActual).subscribe(
        ref=>{console.log(ref)}
      )
    }else{
      Swal.fire(
        {
          icon: 'error',
          title: 'Oops...',
          text: 'Las contraseñas no son iguales',
        }
      )
    }
  }

  getId(){
    let tok:any = localStorage.getItem('token')
    let decode:any = jwtDecode(tok);

    this.num_id = decode.data[0].num_id;
  }

}
