import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { MatDialog } from '@angular/material/dialog';
import { PerfilComponent } from '../perfil/perfil.component';

@Component({
  selector: 'app-main-page',
  templateUrl: './main-page.component.html',
  styleUrls: ['./main-page.component.css']
})
export class MainPageComponent {
  activaOpcion : Number = 0;
  componentes = []
  activarComponenteById:Number = 0;

  constructor(private router:Router, private dialog: MatDialog){}

  ngOnInit(): void {
    this.activaOpcion = 0

  }

  AccionAdmin(num:number){
    this.activaOpcion = num;
  }

  logOut(){
    localStorage.removeItem('token');
    this.router.navigate(['/auth']);
  }

  activarComponente(idComponente:Number){
    this.activarComponenteById = idComponente
  }

  mostrarperfil(){ // Método nuevoUsuario que me muestra una ventana emergente con el componente AgregarUsuario
    this.dialog.open(PerfilComponent,{
      width:'600px',
      height: '475px',
    });
  }


}
