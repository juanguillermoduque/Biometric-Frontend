import { Component, NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { FormsModule } from '@angular/forms'; // importar FormsModule
import { HTTP_INTERCEPTORS, HttpClientModule } from '@angular/common/http';
import { AppComponent } from './app.component';
import { AuthComponent } from './auth/auth.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { AsistenciasComponent } from './asistencias/asistencias.component';



import { CommonModule } from '@angular/common';
// Material Form Controls
import { MatAutocompleteModule } from '@angular/material/autocomplete';
import { MatCheckboxModule } from '@angular/material/checkbox';
import { MatDatepickerModule } from '@angular/material/datepicker';
import { NativeDateModule } from '@angular/material/core';
import { MatNativeDateModule } from '@angular/material/core';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatRadioModule } from '@angular/material/radio';
import { MatSelectModule } from '@angular/material/select';
import { MatSliderModule } from '@angular/material/slider';
import { MatSlideToggleModule } from '@angular/material/slide-toggle';
// Material Navigation
import { MatMenuModule } from '@angular/material/menu';
import { MatSidenavModule } from '@angular/material/sidenav';
import { MatToolbarModule } from '@angular/material/toolbar';
// Material Layout
import { MatCardModule } from '@angular/material/card';
import { MatDividerModule } from '@angular/material/divider';
import { MatExpansionModule } from '@angular/material/expansion';
import { MatGridListModule } from '@angular/material/grid-list';
import { MatListModule } from '@angular/material/list';
import { MatStepperModule } from '@angular/material/stepper';
import { MatTabsModule } from '@angular/material/tabs';
import { MatTreeModule } from '@angular/material/tree';
// Material Buttons & Indicators
import { MatButtonModule } from '@angular/material/button';
import { MatButtonToggleModule } from '@angular/material/button-toggle';
import { MatBadgeModule } from '@angular/material/badge';
import { MatChipsModule } from '@angular/material/chips';
import { MatIconModule } from '@angular/material/icon';
import { MatProgressSpinnerModule } from '@angular/material/progress-spinner';
import { MatProgressBarModule } from '@angular/material/progress-bar';
import { MatRippleModule } from '@angular/material/core';
// Material Popups & Modals
import { MatBottomSheetModule } from '@angular/material/bottom-sheet';
import { MatDialogModule } from '@angular/material/dialog';
import { MatSnackBarModule } from '@angular/material/snack-bar';
import { MatTooltipModule } from '@angular/material/tooltip';
// Material Data tables
import { MatPaginatorModule } from '@angular/material/paginator';
import { MatSortModule } from '@angular/material/sort';
import { MatTableModule } from '@angular/material/table';

import { RouterModule, Routes } from '@angular/router';
import { ComponentFixture } from '@angular/core/testing';

import { FichasComponent } from './fichas/fichas.component';
import { AgregarFichasComponent } from './fichas/agregar-fichas/agregar-fichas.component';
import { CrearAsistenciasComponent } from './asistencias/crear-asistencias/crear-asistencias.component';
import { EditarAsistenciasComponent } from './asistencias/editar-asistencias/editar-asistencias.component';
import { ReporteAsistenciaComponent } from './asistencias/reporte-asistencia/reporte-asistencia.component';

import { UsuariosComponent } from './usuarios/usuarios.component';
import { EditarFichasComponent } from './fichas/editar-fichas/editar-fichas.component';
import { EditarUsuariosComponent } from './usuarios/editar-usuarios/editar-usuarios.component';
import { AgregarUsuarioComponent } from './usuarios/agregar-usuario/agregar-usuario.component';
import { ReporteUsuarioComponent } from './usuarios/reporte-usuario/reporte-usuario.component';
import { ReporteFichasComponent } from './fichas/reporte-fichas/reporte-fichas.component';
import { ReactiveFormsModule } from '@angular/forms';



//import services
import {FichasService} from './services/fichas/fichas.service';
import { UsuariosService } from './services/usuarios/usuarios.service';
import { ExcusasComponent } from './excusas/excusas.component';
import { CrearExcusaComponent } from './excusas/crear-excusa/crear-excusa.component';
import { EditarExcusasComponent } from './excusas/editar-excusas/editar-excusas.component';
import { ReporteExcusasComponent } from './excusas/reporte-excusas/reporte-excusas.component';
import { HorariosComponent } from './horarios/horarios.component';
import { CrearHorariosComponent } from './horarios/crear-horarios/crear-horarios.component';
import { EditarHorariosComponent } from './horarios/editar-horarios/editar-horarios.component';
import { CompetenciasComponent } from './competencias/competencias.component';
import { EditarCompetenciasComponent } from './competencias/editar-competencias/editar-competencias.component';
import { CrearCompetenciasComponent } from './competencias/crear-competencias/crear-competencias.component';
import { MainPageComponent } from './main-page/main-page.component';

import { HttpClientJsonpModule } from '@angular/common/http';
import { RolesComponent } from './roles/roles.component';
import { EditarRolesComponent } from './roles/editar-roles/editar-roles.component';
import { CrearRolesComponent } from './roles/crear-roles/crear-roles.component'; // Importa HttpClientModule y HttpClientJsonpModule
import { AddTokenInterceptor } from './utils/add-token.interceptor';
//guards
import { AuthGuard } from './utils/guard/auth.guard';
import { NavegacionComponent } from './roles/navegacion/navegacion/navegacion.component';


const appRoutes:Routes=[
  {path: "", redirectTo:'/auth', pathMatch:"full"},
  {path: "auth", component:AuthComponent},
  {path: "index", component:MainPageComponent,canActivate:[AuthGuard]}
]

@NgModule({
  declarations: [
    AppComponent,
    AuthComponent,
    AsistenciasComponent,
    FichasComponent,
    CrearAsistenciasComponent,
    EditarAsistenciasComponent,
    UsuariosComponent,
    CrearAsistenciasComponent,
    EditarAsistenciasComponent,
    EditarFichasComponent,
    EditarUsuariosComponent,
    AgregarUsuarioComponent,
    ReporteUsuarioComponent,
    ReporteFichasComponent,
    AgregarFichasComponent,
	  ReporteAsistenciaComponent,
   ExcusasComponent,
   CrearExcusaComponent,
   EditarExcusasComponent,
   ReporteExcusasComponent,
   HorariosComponent,
   CrearHorariosComponent,
   EditarHorariosComponent,
   CompetenciasComponent,
   EditarCompetenciasComponent,
   CrearCompetenciasComponent,
   MainPageComponent,
   RolesComponent,
   EditarRolesComponent,
   CrearRolesComponent,
   NavegacionComponent,


  ],
  imports: [
    MatNativeDateModule,
    BrowserModule,
    HttpClientModule,
    FormsModule,
    BrowserAnimationsModule,
    CommonModule,
    MatAutocompleteModule,
    MatCheckboxModule,
    MatDatepickerModule,
    NativeDateModule,
    MatFormFieldModule,
    MatInputModule,
    MatRadioModule,
    MatSelectModule,
    MatSliderModule,
    MatSlideToggleModule,
    MatMenuModule,
    MatSidenavModule,
    MatToolbarModule,
    MatCardModule,
    MatDividerModule,
    MatExpansionModule,
    MatGridListModule,
    MatListModule,
    MatStepperModule,
    MatTabsModule,
    MatTreeModule,
    MatButtonModule,
    MatButtonToggleModule,
    MatBadgeModule,
    MatChipsModule,
    MatIconModule,
    MatProgressSpinnerModule,
    MatProgressBarModule,
    MatRippleModule,
    MatBottomSheetModule,
    MatDialogModule,
    MatSnackBarModule,
    MatTooltipModule,
    MatPaginatorModule,
    MatSortModule,
    MatTableModule,
    NativeDateModule,
    MatNativeDateModule,
    ReactiveFormsModule,
    HttpClientJsonpModule,
    RouterModule.forRoot(appRoutes)
  ],
  exports: [
    MatAutocompleteModule,
    MatCheckboxModule,
    MatDatepickerModule,
    MatFormFieldModule,
    BrowserAnimationsModule,
    MatInputModule,
    MatRadioModule,
    MatSelectModule,
    MatSliderModule,
    NativeDateModule,
    MatSlideToggleModule,
    MatMenuModule,
    MatSidenavModule,
    MatToolbarModule,
    MatCardModule,
    MatDividerModule,
    MatExpansionModule,
    MatGridListModule,
    MatListModule,
    MatStepperModule,
    MatTabsModule,
    MatTreeModule,
    MatButtonModule,
    MatButtonToggleModule,
    MatBadgeModule,
    MatChipsModule,
    MatIconModule,
    MatProgressSpinnerModule,
    MatProgressBarModule,
    MatRippleModule,
    MatBottomSheetModule,
    MatDialogModule,
    MatSnackBarModule,
    MatTooltipModule,
    MatPaginatorModule,
    MatSortModule,
    MatTableModule,
    NativeDateModule,
    MatNativeDateModule,

  ],
  providers: [
    {provide:HTTP_INTERCEPTORS, useClass: AddTokenInterceptor, multi:true},
    FichasService,
    UsuariosService,
    UsuariosService
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
