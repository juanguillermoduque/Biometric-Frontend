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
