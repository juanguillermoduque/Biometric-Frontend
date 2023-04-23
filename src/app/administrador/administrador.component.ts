import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-administrador',
  templateUrl: './administrador.component.html',
  styleUrls: ['./administrador.component.css']
})
export class AdministradorComponent implements OnInit {

  activaOpcion : Number = 0;


  constructor(){

  }

  ngOnInit(): void {
    this.activaOpcion = 0
  }


  AccionAdmin(num:number){
    this.activaOpcion = num;
  }
}


/*Este es un archivo de componente de Angular llamado "AdministradorComponent". Importa los módulos "Component" y "OnInit" de
Angular. Define una variable llamada "activaOpcion" que se inicializa en cero. Luego define un constructor vacío y una función
"ngOnInit()" que establece "activaOpcion" en cero. Además, define una función "AccionAdmin()" que toma un número como parámetro
y establece "activaOpcion" en ese número.*/
