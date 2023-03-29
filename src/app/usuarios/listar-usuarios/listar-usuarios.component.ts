import { Component } from '@angular/core';

@Component({
  selector: 'app-listar-usuarios',
  templateUrl: './listar-usuarios.component.html',
  styleUrls: ['./listar-usuarios.component.css']
})
export class ListarUsuariosComponent {
  displayedColumns: string[] = ['NombreUsuario', 'TipoDocumento', 'NumeroDocumento', 'CorreoElectronico',  'NumeroFicha', 'Telefono','RolSistema','edit'];
}