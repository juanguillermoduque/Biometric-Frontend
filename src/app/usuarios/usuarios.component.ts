import { Component, OnInit } from '@angular/core';
import { UsuariosService } from '../services/usuarios/usuarios.service';
import { MatDialog } from '@angular/material/dialog';
import { AgregarUsuarioComponent } from './agregar-usuario/agregar-usuario.component';
import { EditarUsuariosComponent } from './editar-usuarios/editar-usuarios.component';

@Component({
  selector: 'app-usuarios',
  templateUrl: './usuarios.component.html',
  styleUrls: ['./usuarios.component.css']
})

export class UsuariosComponent implements OnInit  { // llamado de componente Usuarios implementando la interfaz OnInit
  displayedColumns: string[] = ['NombreUsuario', 'TipoDocumento', 'NumeroDocumento', 'CorreoElectronico','RolSistema','edit']; // Arreglo de columnas para mostrar en una tabla
  searchId:string = ""; 
  usuarios:any = []; // variable usuarios que es un arreglo vacío
  dataSource = this.usuarios; // se utiliza como fuente de datos para la tabla
  
  constructor(private usuarioService: UsuariosService, public dialog:MatDialog){
    // definición de UsuariosService que tiene la conexión con el back
    // MatDialog proporciona una ventana emergente en la cual se puede ingresar información sin la necesidad de cambiar de ruta

  }

  ngOnInit(){
    // el ngOnInit se ejecuta cuando se inicializa el componente
    // se realiza el llamado al servicio usuarioService para obtener datos de los usuarios
    this.usuarioService.getUsuarios().subscribe( // utilizado para subscribirse a un flujo de eventos y recibir notificaciones de cuando ocurra un cambio
      res =>{ // si la respuesta por parte del servidor es exitosa se asigna el valor de res a this.usuarios y luego se muestra por pantalla el valor de usuarios
        this.usuarios = res;
        console.log(this.usuarios);
      },
      err=>console.error(err) // de lo contrario saldrá un error
    )
  }

  nuevoUsuario(){ // Método nuevoUsuario que me muestra una ventana emergente con el componente AgregarUsuario
    const ref = this.dialog.open(AgregarUsuarioComponent,{
      width:'700px',
      height: '500px',
    });
    ref.afterClosed().subscribe(result =>{
      console.log('resultado del dialogo', result);
      this.actualizarUsuarios();
    });
  }

  actualizarUsuarios(): void {
    this.usuarioService.getUsuarios().subscribe(
      (res: any) => { // Se cambia el tipo de datos a any
        this.usuarios = res;
        console.log(this.usuarios);
      },
      err => console.error(err)
    );
  }

  editarUsuarios(num_id : number){
    // Método editarUsuario que me muestra una ventana emergente con el componente EditarUsuarios
    // como parámetro me recibira el valor de num_id
    this.dialog.open(EditarUsuariosComponent,{
      height:'800px',
      width: '600px',
      data: num_id
    });
  }

  searchUser(){
    this.usuarioService.searchUsuario(this.searchId).subscribe(
      res=>{
        console.log("Búsqueda realizada", res);
      },
      err=>{console.log(err)}
    )
  }
}
