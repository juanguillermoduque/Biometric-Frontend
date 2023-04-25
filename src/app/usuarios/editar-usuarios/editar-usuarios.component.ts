import { Component, Inject, inject } from '@angular/core';
import { MAT_DIALOG_DATA } from '@angular/material/dialog';
import { ActivatedRoute } from '@angular/router';
import { usuario } from 'src/app/models/usuarios';
import { UsuariosService } from 'src/app/services/usuarios/usuarios.service';

@Component({
  selector: 'app-editar-usuarios',
  templateUrl: './editar-usuarios.component.html',
  styleUrls: ['./editar-usuarios.component.css']
})
export class EditarUsuariosComponent {

  usuario : usuario = {
    num_id:0,
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

constructor(private usuariosService:UsuariosService,
  @Inject(MAT_DIALOG_DATA) public num_id:number){

}
  ngOnInit(){
    if(this.num_id){
      this.usuariosService.getUsuario(this.num_id)
        .subscribe(
          res=>{
            console.log(res);
          },
          err => console.error(err)
        )
  }
  }
  
  modificarUsuario(){
    delete this.usuario.created_at;
    delete this.usuario.updated_at;
    delete this.usuario.biometric_date;
    console.log(this.usuario);

    this.usuariosService.updateUsuario(this.num_id,this.usuario)
    
      .subscribe(
        res =>{
          console.log(res);
        },
        err => console.error(err)
      )
  }

}

