import { Injectable } from '@angular/core';
import { ActivatedRouteSnapshot, CanActivate, Router, RouterStateSnapshot, UrlTree } from '@angular/router';
import { Observable } from 'rxjs';
import Swal from 'sweetalert2';

@Injectable({
  providedIn: 'root'
})
export class AuthGuard implements CanActivate {
  
  constructor(private router:Router){

  }

  canActivate(
    route: ActivatedRouteSnapshot,
    state: RouterStateSnapshot): Observable<boolean | UrlTree> | Promise<boolean | UrlTree> | boolean | UrlTree {
    const token = localStorage.getItem('token');

    if(this.router.url == '/auth'){
      return true
    }
    else if(token == undefined){
      this.router.navigate(['/auth']);
      Swal.fire(
        {
          icon: 'error',
          title: 'Oops...',
          text: 'Acceso denegado',
        }
      )
    }
    return true;
  }
  
}
