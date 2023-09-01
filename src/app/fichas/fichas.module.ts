import { NgModule } from '@angular/core';
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

import { FormsModule } from '@angular/forms'; // importar FormsModule
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { ReactiveFormsModule } from '@angular/forms';

import { AgregarFichasComponent } from './componentes/agregar-fichas/agregar-fichas.component';
import { EditarFichasComponent } from './componentes/editar-fichas/editar-fichas.component';
import { FichasComponent } from './componentes/listar-fichas/fichas.component';
import { FlexLayoutModule } from '@angular/flex-layout';
import { FichasInstructorComponent } from './componentes/fichas-instructor/fichas-instructor.component';
import { VincularAprendizComponent } from './componentes/vincular-aprendiz/vincular-aprendiz.component';
import { VincularInstructorComponent } from './componentes/vincular-instructor/vincular-instructor.component';
import { ListarAprendicesComponent } from './componentes/listar-aprendices/listar-aprendices.component';
import { ListarInstructoresComponent } from './componentes/listar-instructores/listar-instructores.component';

@NgModule({
  declarations: [
    AgregarFichasComponent,
    EditarFichasComponent,
    FichasComponent,
    FichasInstructorComponent,
    VincularAprendizComponent,
    VincularInstructorComponent,
    ListarAprendicesComponent,
    ListarInstructoresComponent,
  ],

  exports:[
    AgregarFichasComponent,
    EditarFichasComponent,
    FichasComponent,
    FichasInstructorComponent,
    VincularAprendizComponent,
    VincularInstructorComponent
  ],

  imports: [
    CommonModule,
    FlexLayoutModule,
    //Angular Material
    MatNativeDateModule,
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
    FormsModule,
    ReactiveFormsModule,
    BrowserAnimationsModule
  ]
})
export class FichasModule { }
