import { Component, ViewChild } from '@angular/core';
import { RolesService } from '../../roles.service';
import { MatDialog } from '@angular/material/dialog';
import { CrearRolesComponent } from '../crear-roles/crear-roles.component';
import { EditarRolesComponent } from '../editar-roles/editar-roles.component';
import { FormControl } from '@angular/forms';
import { MatTable } from '@angular/material/table';
import { debounceTime } from 'rxjs';

@Component({
  selector: 'app-roles',
  templateUrl: './roles.component.html',
  styleUrls: ['./roles.component.css']
})
export class RolesComponent {
  @ViewChild(MatTable) table: MatTable<any>;
  displayedColumns: string[] = ['NumeroRol', 'NombreRol', 'Acciones'];
  roles:any = [];
  dataSource = this.roles;
  control = new FormControl();

  constructor(
    private rolesService: RolesService,
    public dialog: MatDialog,
    ){}

  ngOnInit(){
    this.getRoles();
    this.searchRol();
  }

  getRoles(){
    this.rolesService.getRoles().subscribe(
      res =>{
        this.roles = res;
      },
      err=>console.error(err)
    )
  }

  nuevoRol(){
    this.dialog.open(CrearRolesComponent,{
      width:'600px',
      height:'500px',
      panelClass: 'custom-dialog-create-update',
    })
  }

  editarRol(num_id : number){
    this.dialog.open(EditarRolesComponent,{
      width:'600px',
      height:'500px',
      panelClass: 'custom-dialog-create-update',
      data: num_id
    });
  }


  findRoles(query: string){
    if (query == ""){
      this.getRoles()
    }

    this.rolesService.searchRoles(query).subscribe(
      (res:any)=>{

        let aux = res;

        this.roles = aux;
        this.table.renderRows();

      },
      err=>{console.error(err)}
    )
  }

  searchRol(){

    this.control.valueChanges.pipe(
      debounceTime(500)
    ).subscribe(query => {

      this.findRoles(query)
    })

  }
} 