import { Component, OnInit } from '@angular/core'; /*importación del componente OnInit*/
import { excusa } from '../../excusas'; /*importación del modelo excusas trayendo la interfaz excusa*/
import { ExcusasService } from '../../excusas.service'; /* importación del servicio ExcusasService que hace una conexión con el backend*/
import Swal from 'sweetalert2'
import { RolesService } from 'src/app/roles/roles.service';
import { AsistenciasService } from 'src/app/asistencias/asistencias.service';
import { UsuariosService } from 'src/app/usuarios/usuarios.service';
import { MatDatepickerInputEvent } from '@angular/material/datepicker';
import { MatDialogRef } from '@angular/material/dialog';


@Component({ /* es un decorador que se utiliza para configurar las propiedades del componente "crear-excusa"*/
  selector: 'app-crear-excusa', /* es una cadena de texto que se utiliza para identificar y usar el componente en las plantillas HTML de la aplicación */
  templateUrl: './crear-excusa.component.html', // es una cadena de texto que especifica la ruta del archivo de plantilla HTML asociado con el componente
  styleUrls: ['./crear-excusa.component.css'] // especifica las rutas de los archivos de hojas de estilo CSS asociados con el componente
})
export class CrearExcusaComponent implements OnInit { // llamado de componente CrearExcusa implementando la interfaz OnInit
  excusa : excusa = { // definición de variable excusa que esta inicializada con un objeto que sigue la estructura de la interfaz excusa
    id_excusa:0,
    id_asistencia:0, 
    id_instructor:0,
    fecha:'',
    estado:'',
    comments:'',
    archivo:'',
    
  };

  instructores:any = [];
  instructoresIdRol:any= [];
  instructoresId:any[]= [];
  asistencias:any = [];

  AsistenciaInstructor = {
    id_instructor: 0
  };


  selectedDates: Array<Date | null> = [];

constructor(private excusasService:ExcusasService, private rolesService:RolesService, private asistenciasService:AsistenciasService,
  private usuariosService:UsuariosService,public dialogRef: MatDialogRef<CrearExcusaComponent>){ // creación de constructor invocando el servicio de ExcusasService que me trae información del backend
}

  ngOnInit(): void{ 
    this.getAsistencias();// Este método se utiliza para realizar tareas de inicialización en el componente, como la obtención de datos iniciales o la configuración de alguna variable
    this.getIdUsuario();
  }

  agregarInstructor(instructor:any){
    this.AsistenciaInstructor.id_instructor = instructor.num_id;
    this.excusa.id_instructor = instructor.num_id;
  }


  getAsistencias(){
    this.asistenciasService.getAsistencias().subscribe(
      res => {
        console.log( res );
        let aux:any = res;
        this.asistencias.push(aux[0]);
      }
    )
  }

  getIdUsuario(){
    this.rolesService.searchInstructores().subscribe(
      (instructores) => {
        this.instructoresIdRol = instructores;
        this.getUsuario();
      }
    );
  }

  getUsuario(){
    for(let i = 0; i < this.instructoresIdRol.length; i++){
      this.instructoresId.push(this.instructoresIdRol[i].id_usuario)
    }
    this.getInstructor();
  }
  getInstructor(){
    for(let i = 0; i < this.instructoresId.length; i++){
      this.usuariosService.getUsuario(this.instructoresId[i]).subscribe(
        (data)=>{
          this.instructores.push(data);
        }
      )
    }
    
  }

  guardarExcusa(){ // Método que me guardará la excusa 
    delete this.excusa.id_excusa; // al usar el método excusa el valor de id_excusa se eliminará
    if (this.excusa.comments == ''){
      Swal.fire(
        {
          icon: 'error',
          title: 'Oops...',
          text: 'Hay campos sin completar',
        }
      )
      
   
    }
    else{
      for(let i = 0; i < this.selectedDates.length; i++){
        this.excusa.fecha = this.normalizarDate(this.selectedDates[i]);
        this.excusasService.saveexcusa(this.excusa) // el Método saveexcusa del servicio excusasService se llama pasandole como argumento el objeto this.excusa
        .subscribe( // utilizado para subscribirse a un flujo de eventos y recibir notificaciones de cuando ocurra un cambio
        // este método se utiliza para suscribirse a un Observable, el cual puede recibirme la respuesta del servidor
          res =>{  // si la respuesta por parte del servidor es exitosa se imprime la respuesta
            Swal.fire({
              position: 'center',
              icon: 'success',
              title: 'La excusa fue agregada exitosamente',
              showConfirmButton: false,
              timer: 1500
            }).then((result) => {
              if (result.isConfirmed) {
                this.dialogRef.close();
              } 
            });      
          },
          err => console.error(err) // de lo contrario saldrá un error
        )
      }
    }
  }

  normalizarDate(date:Date|null){
    if(date == null){
      return '';
    }
      let day = date.getDate()
      let month = date.getMonth() + 1
      let year = date.getFullYear()
      if(month < 10){
        return(`${year}-0${month}-${day}`)
      }else{
        return(`${year}-${month}-${day}`)
      }
    }

  addEvent(event: MatDatepickerInputEvent<Date>): void {
    this.selectedDates.push(event.value);
  }

  agregarAsistencia(id:any){
    this.excusa.id_asistencia= id;
  } 
}
