import { Component } from '@angular/core';

@Component({
  selector: 'app-main-page',
  templateUrl: './main-page.component.html',
  styleUrls: ['./main-page.component.css']
})
export class MainPageComponent {
  activaOpcion : Number = 0;
  componentes = []


  constructor(){

  }

  ngOnInit(): void {
    this.activaOpcion = 0
    
  }

  AccionAdmin(num:number){
    this.activaOpcion = num;
  }
}
