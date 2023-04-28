import { Component, OnInit } from '@angular/core'; /*importación del componente OnInit*/
import { UsuariosService } from '../services/usuarios/usuarios.service'; /* importación del servicio usuariosService que hace una conexión con el backend*/
import {MatDialog, MatDialogRef} from '@angular/material/dialog'; // importación del componente MatDialog
import { AgregarUsuarioComponent } from './agregar-usuario/agregar-usuario.component'; // importación del componente AgregarUsuario
import { EditarUsuariosComponent } from './editar-usuarios/editar-usuarios.component'; // // importación del componente EditarUsuario

@Component({/* es un decorador que se utiliza para configurar las propiedades del componente usuarios*/
  selector: 'app-usuarios', /* es una cadena de texto que se utiliza para identificar y usar el componente en las plantillas HTML de la aplicación */
  templateUrl: './usuarios.component.html',  // es una cadena de texto que especifica la ruta del archivo de plantilla HTML asociado con el componente
  styleUrls: ['./usuarios.component.css'] // especifica las rutas de los archivos de hojas de estilo CSS asociados con el componente
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
    this.dialog.open(AgregarUsuarioComponent,{
      width:'1000px',
      height: '1000px',
    })
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
