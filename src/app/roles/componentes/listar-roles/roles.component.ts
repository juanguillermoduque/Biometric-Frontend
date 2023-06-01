import { Component } from '@angular/core';
import { RolesService } from '../../roles.service';
import { MatDialog } from '@angular/material/dialog';
import { CrearRolesComponent } from '../crear-roles/crear-roles.component';
import { EditarRolesComponent } from '../editar-roles/editar-roles.component';

@Component({
  selector: 'app-roles',
  templateUrl: './roles.component.html',
  styleUrls: ['./roles.component.css']
})
export class RolesComponent {
  displayedColumns: string[] = ['NumeroRol', 'NombreRol', 'Acciones'];
  roles:any = [];
  dataSource = this.roles;

  constructor(
    private rolesService: RolesService,
    public dialog: MatDialog,
    ){}

ngOnInit(){
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
    height:'600px',
  })
}

editarRol(num_id : number){
  this.dialog.open(EditarRolesComponent,{
    height:'600px',
    width:'600px',
    data: num_id
  });
}
}