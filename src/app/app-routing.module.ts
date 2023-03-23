import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AuthComponent } from './auth/auth.component';
import { AdministradorComponent } from './administrador/administrador.component';

const routes: Routes = [
  { path: '', component: AuthComponent },
  { path: 'Administrador', component: AdministradorComponent }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
