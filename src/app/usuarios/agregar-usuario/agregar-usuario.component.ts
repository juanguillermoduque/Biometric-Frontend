
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
    iduser:0,
    first_name:'',
    idficha:0,
    last_name:'',
    type_id: '',
    email:'',
    num_id :0,
    cellphone :0,
    rol :'',
    status: '',
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
    delete this.usuario.iduser;
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
/*
Este código define un componente de Angular llamado "AgregarUsuarioComponent" que tiene una variable llamada "usuario" que es un
objeto con varias propiedades. También importa y utiliza un servicio llamado "UsuariosService" para guardar el usuario en una base
de datos. La función "guardarUsuario" se ejecuta cuando se hace clic en el botón "Agregar" y utiliza el servicio para guardar el
usuario. La función también elimina algunas propiedades del objeto "usuario" antes de guardar el usuario en la base de datos.*/
