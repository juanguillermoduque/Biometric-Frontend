import { Component, OnInit, ViewChild } from '@angular/core';
import { UsuariosService } from '../../usuarios.service';
import { MatDialog } from '@angular/material/dialog';
import { AgregarUsuarioComponent } from '../agregar-usuario/agregar-usuario.component';
import { EditarUsuariosComponent } from '../editar-usuarios/editar-usuarios.component';
import { FormControl } from '@angular/forms';
import { debounceTime, find } from 'rxjs';
import { MatTable, MatTableDataSource } from '@angular/material/table';
import { RolesService } from '../../../roles/roles.service';
import { rol } from 'src/app/roles/roles';
import { usuario } from '../../usuarios';
import { ExportService } from 'src/app/utils/export/export.service';

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

  constructor(
    private usuarioService: UsuariosService, public dialog:MatDialog, private rolService:RolesService,
    private exportService:ExportService
    ){

    // definición de UsuariosService que tiene la conexión con el back
    // MatDialog proporciona una ventana emergente en la cual se puede ingresar información sin la necesidad de cambiar de ruta
  }


  ngOnInit(){
    this.getUsuario();
    this.searchUser(); 
  }

  ExportarUsuarios(){
    let usuarios = this.usuarios[0];
    for (let i =0; i< usuarios.length;i++){
      delete usuarios[i].created_at;
      delete usuarios[i].password;
      delete usuarios[i].updated_at;
      delete usuarios[i].biometric_date;
    }
    let dataSourse = new MatTableDataSource(usuarios)

    this.exportService.exportExcel(dataSourse.data,"usuarios")
  }

  getUsuario(){
    this.usuarioService.getUsuarios().subscribe(
      res =>{
        this.usuarios = res;
        this.usuarios = this.cargarRoles(this.usuarios);

      },
      err=>console.error(err)
    )
  }

  nuevoUsuario(){ // Método nuevoUsuario que me muestra una ventana emergente con el componente AgregarUsuario

    const ref = this.dialog.open(AgregarUsuarioComponent,{
      height:'550px',
      width: '600px',
      panelClass: 'custom-dialog-create-update'
    });
    ref.afterClosed().subscribe(result =>{
      this.getUsuario();
    });
  }

  cargarRoles(lista:any){
    for(let i = 0; i < lista[0].length;i++){
      this.rolService.getRolByIdUser(lista[0][i].num_id).subscribe(
        (data:any)=>{
          let rol:rol = data
          let nombreRol = rol.nombre_rol;
          lista[0][i].rol = nombreRol;
        }
      )
    }
    return lista;
  }

  editarUsuarios(num_id : number){
    const ref = this.dialog.open(EditarUsuariosComponent,{
      height:'550px',
      width: '600px',
      panelClass: 'custom-dialog-create-update',
      data: num_id
    });
    ref.afterClosed().subscribe(result =>{
      this.getUsuario();
    });
  }


  findUsers(query: string){
    if (query == ""){
      this.getUsuario()
    }

    this.usuarioService.searchUsuario(query).subscribe(
      (res:any)=>{

        let aux = res;
        this.usuarios = aux;
        this.usuarios = this.cargarRoles(this.usuarios);
        this.table.renderRows();

      },
      err=>{console.error(err)}
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
