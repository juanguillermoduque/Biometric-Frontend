import { Component, OnInit } from '@angular/core'; /*importación del componente OnInit*/
import { excusa } from '../../../excusas'; /*importación del modelo excusas trayendo la interfaz excusa*/
import { ExcusasService } from '../../../excusas.service'; /* importación del servicio ExcusasService que hace una conexión con el backend*/
import Swal from 'sweetalert2'
import { RolesService } from 'src/app/roles/roles.service';
import { UsuariosService } from 'src/app/usuarios/usuarios.service';
import { HorariosService } from 'src/app/horarios/horarios.service';
import { MatDialogRef } from '@angular/material/dialog';
import jwtDecode from 'jwt-decode';


@Component({ /* es un decorador que se utiliza para configurar las propiedades del componente "crear-excusa"*/
  selector: 'app-crear-excusa', /* es una cadena de texto que se utiliza para identificar y usar el componente en las plantillas HTML de la aplicación */
  templateUrl: './crear-excusa.component.html', // es una cadena de texto que especifica la ruta del archivo de plantilla HTML asociado con el componente
  styleUrls: ['./crear-excusa.component.css'] // especifica las rutas de los archivos de hojas de estilo CSS asociados con el componente
})
export class CrearExcusaComponent implements OnInit { // llamado de componente CrearExcusa implementando la interfaz OnInit
  excusa : excusa = { // definición de variable excusa que esta inicializada con un objeto que sigue la estructura de la interfaz excusa
    id_excusa:0,
    id_horario:0, 
    id_aprendiz:0,
    comments:'',
    ruta_archivo: ''
    
  };

  horarios:any[] =[];

  private fileTmp:any;

constructor(private excusasService:ExcusasService, private rolesService:RolesService, private horariosService:HorariosService,
  public dialogRef: MatDialogRef<CrearExcusaComponent>){ // creación de constructor invocando el servicio de ExcusasService que me trae información del backend
}

  ngOnInit(): void{ 
    this.getHorarios();
  }

  agregarHorario(id:any){
    this.excusa.id_horario = id;
  }

  getHorarios(){
    this.horariosService.getHorarios().subscribe(
      res => {
        console.log( res );
        let aux:any = res;
        this.horarios.push(aux[0]);
      }
    )
  }

  getIdUsuario(){
    let tok:any = localStorage.getItem('token')
    let decode:any = jwtDecode(tok);
    this.excusa.id_aprendiz = decode.data[0].num_id;
  }

  guardarExcusa(ruta:string){ // Método que me guardará la excusa 
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
      this.excusa.ruta_archivo = ruta;
      this.getIdUsuario();

        this.excusasService.saveexcusa(this.excusa) // el Método saveexcusa del servicio excusasService se llama pasandole como argumento el objeto this.excusa
        .subscribe( // utilizado para subscribirse a un flujo de eventos y recibir notificaciones de cuando ocurra un cambio
        // este método se utiliza para suscribirse a un Observable, el cual puede recibirme la respuesta del servidor
          res =>{  // si la respuesta por parte del servidor es exitosa se imprime la respuesta
            Swal.fire({
              position: 'center',
              icon: 'success',
              title: 'La excusa fue agregada exitosamente',
              showConfirmButton: true,
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

    getFile($event:any): void {
      const [file] = $event.target.files;
      console.log(file)
      if(file.type != 'application/pdf'){
          Swal.fire({
          position: 'center',
          icon: 'error',
          title: 'Solo se permite pdf',
          showConfirmButton: true,
          timer: 1500
        }) 

        return;
      }
      this.fileTmp={
        fileRaw:file,
        fileName:file.name
      }
    }

    sendFile():void{
      const body = new FormData();
      if(!this.fileTmp){
        Swal.fire({
          position: 'center',
          icon: 'error',
          title: 'No olvides subir el archivo',
          showConfirmButton: true,
          timer: 1500
        }) 
        return;
      }
      body.append('myFile', this.fileTmp.fileRaw, this.fileTmp.fileName);
      this.excusasService.sendPost(body).subscribe(
        res =>{
          console.log(res)
          if(res.length > 0){
            this.guardarExcusa(res);
          }
        }  
      )
    }
  }


