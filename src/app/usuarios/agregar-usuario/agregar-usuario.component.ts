
import { UsuariosService } from 'src/app/services/usuarios/usuarios.service';
import { usuario } from 'src/app/models/usuarios';
import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-agregar-usuario',
  templateUrl: './agregar-usuario.component.html',
  styleUrls: ['./agregar-usuario.component.css']
})
export class AgregarUsuarioComponent implements OnInit {

  usuario : usuario = {
    num_id:123456789,
    first_name:'',
    last_name:'',
    type_id: '',
    email:'',
    rol :'',
    estado: '',
    password: '',
    biometric_date: '',
    created_at: '',
    updated_at: '',
};
constructor(private usuariosService:UsuariosService){

}
  ngOnInit(){

  }
  guardarUsuario(){
    delete this.usuario.created_at;
    delete this.usuario.updated_at;
    delete this.usuario.biometric_date;
    console.log(this.usuario);

    this.usuariosService.saveUsuario(this.usuario)
    
      .subscribe(
        res =>{
          console.log(res);
        },
        err => console.error(err)
      )
  }

}
