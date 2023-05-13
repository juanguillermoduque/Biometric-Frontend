import { Component } from '@angular/core';
import { Router } from '@angular/router';
import jwtDecode from 'jwt-decode';

@Component({
  selector: 'app-main-page',
  templateUrl: './main-page.component.html',
  styleUrls: ['./main-page.component.css']
})
export class MainPageComponent {
  activaOpcion : Number = 0;
  componentes = []
  activarComponenteById:Number = 0;
  nombreUser:string = ""

  constructor(private router:Router){}

  ngOnInit(): void {
    this.activaOpcion = 0
    let tok:any = localStorage.getItem('token')
    let decode:any = jwtDecode(tok);
    this.nombreUser =  decode.data[0].email;
    
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
  
}
