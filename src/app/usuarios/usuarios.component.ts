import { Component, OnInit, ViewChild } from '@angular/core';
import { UsuariosService } from '../services/usuarios/usuarios.service';
import { MatDialog } from '@angular/material/dialog';
import { AgregarUsuarioComponent } from './agregar-usuario/agregar-usuario.component';
import { EditarUsuariosComponent } from './editar-usuarios/editar-usuarios.component';
import { query } from '@angular/animations';
import { FormControl } from '@angular/forms';
import { debounceTime, find } from 'rxjs';
import { MatTable } from '@angular/material/table';

@Component({
  selector: 'app-usuarios',
  templateUrl: './usuarios.component.html',
  styleUrls: ['./usuarios.component.css']
})

export class UsuariosComponent implements OnInit  { // llamado de componente Usuarios implementando la interfaz OnInit
  

  @ViewChild(MatTable) table: MatTable<any>;
  
  displayedColumns: string[] = ['NombreUsuario', 'TipoDocumento', 'NumeroDocumento', 'CorreoElectronico','RolSistema','edit']; // Arreglo de columnas para mostrar en una tabla
  searchId:string = ""; 
  
  usuarios:any = []; // variable usuarios que es un arreglo vacío
  dataSource = this.usuarios; // se utiliza como fuente de datos para la tabla
  control = new FormControl();
  usuariosAux: any;
  
  constructor(private usuarioService: UsuariosService, public dialog:MatDialog){
    // definición de UsuariosService que tiene la conexión con el back
    // MatDialog proporciona una ventana emergente en la cual se puede ingresar información sin la necesidad de cambiar de ruta

  }

   
  ngOnInit(){
    this.getUsuario();
    this.searchUser();
  }

  getUsuario(){
    this.usuarioService.getUsuarios().subscribe(
      res =>{
        this.usuarios = res;
        console.log(this.usuarios);
      },
      err=>console.error(err)
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



findUsers(query: string){
  if (query == ""){
    this.getUsuario()
  }

  this.usuarioService.searchUsuario(query).subscribe(
  res=>{
    
    this.usuariosAux = res;
    this.dataSource = this.usuariosAux[0];
    console.log("Busqueda realizada",this.dataSource);

  },
  err=>{console.log(err)}
)
}
searchUser(){

  this.control.valueChanges.pipe(
    debounceTime(500)
  ).subscribe(query => {

    this.findUsers(query)
  })
  
}
}