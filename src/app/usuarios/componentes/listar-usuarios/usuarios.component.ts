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
import Swal from 'sweetalert2';
import { ExportService } from 'src/app/utils/export/export.service';
import { ImportService } from 'src/app/utils/import/import.service';
import { usuario_rol } from 'src/app/roles/usuario_rol';

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
  data: any[][] = [];

  constructor(
    private usuarioService: UsuariosService, public dialog:MatDialog, private rolService:RolesService,
    private exportService:ExportService,    private importService:ImportService,private usuariosService:UsuariosService
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

  importarUsuarios(evt:any){
    const target: DataTransfer = <DataTransfer>(evt.target);

    if (target.files.length !== 1) {
      Swal.fire('Error', 'No se puede usar múltiples archivos', 'error');
      return;
    }

    this.importService.readExcel(target.files[0]).then(rows => {
      this.data = rows;
      debugger
      if(
        (this.data[0][0] == 'num_id') 
      && (this.data[0][1] == 'first_name')  
      && (this.data[0][2] == 'last_name') 
      && (this.data[0][3] == 'type_id')
      && (this.data[0][4] == 'email')  
      && (this.data[0][5] == 'password') 
      && (this.data[0][6] == 'rol_id')
      ){
        for(let i = 1 ; i < this.data.length; i++){
          if(!this.guardarUsuario(this.data[i][0],this.data[i][1],this.data[i][2],this.data[i][3],this.data[i][4],this.data[i][5],this.data[i][6])){
            Swal.fire('Error', 'Datos invalidos', 'error');
          }
        }
        this.getUsuario();
        Swal.fire({
          position: 'center',
          icon: 'success',
          title: 'Importación Exitosa',
          showConfirmButton: true,
          timer: 1500
        })
        
      }else{
        Swal.fire('Error', 'Datos invalidos', 'error');
      }
      console.log(this.data[0][0])
    }).catch(error => {
      Swal.fire('Error', error, 'error');
    });

    
  }

  guardarUsuario(num_id:number,first_name:string,last_name:string,type_id:string,email:string,password:string,id_rol:number):boolean{
    if (num_id == 0 || first_name == '' || last_name == '' || type_id == ''
      || email == '' || password == '' || id_rol == 0) {
        Swal.fire(
          {
            icon: 'error',
            title: 'Oops...',
            text: 'Hay campos sin completar',
          }
        )
        return false;
      }
      else{
        let usuario : usuario = { 
          num_id:num_id,
          first_name:first_name,
          last_name:last_name,
          type_id: type_id,
          email:email,
          password: password
      };console.log(usuario)
        first_name = first_name?.toLowerCase()
        last_name = last_name?.toLowerCase()
        email = email?.toLowerCase()
        this.usuariosService.saveUsuario(usuario)
        .subscribe( 
          res =>{
            this.asignarRol(num_id,id_rol);
            return true;
          },
          err => console.error(err) // de lo contrario saldrá un error
      )
      }
      return false;
  }

  asignarRol(num_id:number,id_rol:number){
    let ids:usuario_rol = {
      id_usuario:num_id,
      id_rol:id_rol
    };

    this.rolService.saveUsuarioRol(ids).subscribe(
      (res)=>{

      },(err)=>{
        console.error(err);
      }
    )
  }
}
