import { Component, OnInit } from '@angular/core';  /*importación del componente OnInit*/
import { ExcusasService } from '../../../excusas.service'; /* importación del servicio ExcusasService que hace una conexión con el backend*/
import {MatDialog} from '@angular/material/dialog'; // importación del componente MatDialog
import { CrearExcusaComponent } from '../../aprendiz/crear-excusa/crear-excusa.component'; // importación del componente CrearExcusas
import { FormControl } from '@angular/forms';
import { debounceTime } from 'rxjs';
import jwtDecode from 'jwt-decode';

@Component({
  selector: 'app-listar-excusa',
  templateUrl: './listar-excusa.component.html',
  styleUrls: ['./listar-excusa.component.css']
})
export class ListarExcusaComponent {
  displayedColumns: string[] = ['Fecha', 'Aprendiz', 'Estado', 'Comentarios', 'Archivo']; // Arreglo de columnas para mostrar en una tabla
  excusas:any = []; // variable excusa que es un arreglo de 6 valores vacíos todos de tipo string
  dataSource = this.excusas; // se utiliza como fuente de datos para la tabla
  control = new FormControl();

  
  constructor(
    private excusaService: ExcusasService, // definición de ExcusasService que tiene la conexión con el back
    public dialog: MatDialog, // MatDialog proporciona una ventana emergente en la cual se puede ingresar información sin la necesidad de cambiar de ruta
    ){

  }
  // el ngOnInit se ejecuta cuando se inicializa el componente
  ngOnInit(){ 
    this.getExcusasAprendiz();   
    this.searchExcusa(); 
  }

  getIdUsuario(){
    let tok:any = localStorage.getItem('token')
    let decode:any = jwtDecode(tok);
    return decode.data[0].num_id;
  }

  getExcusasAprendiz(){
    const id = this.getIdUsuario();
    this.excusaService.getExcusasAprendiz(id).subscribe( 
      res =>{ 
        console.log(res);
        this.excusas = res;
      },
      err=>console.error(err)
      )
  }

  crearExcusa(){ // Método crearExcusa que me muestra una ventana emergente con el componente CrearExcusa
    this.dialog.open(CrearExcusaComponent, {
      height: '630px',
      width: '600px',
      panelClass: 'custom-dialog-create-update',
    }).afterClosed().subscribe(
      ()=>{
        this.getExcusasAprendiz();
      }
    );
  }

  searchExcusa(){

    this.control.valueChanges.pipe(
     
    ).subscribe(query => {
  
      this.findExcusas(query)
    })
  }

  findExcusas(query:string){
    if (query == ""){
      this.getExcusasAprendiz()
    }
  
    this.excusaService.search(query).subscribe(
    res=>{
      this.excusas = res;
    },
    err=>{console.error(err)}
  )
}
downloadPdf(fileName:string) {
  const fileId ={'filename' : fileName} ; // Reemplaza con el ID del archivo que deseas descargar
  this.excusaService.downloadPDF(fileId.filename).subscribe((response) => {

    const blob = new Blob([response], { type: 'application/pdf' });
    const downloadUrl = window.URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = downloadUrl;
    a.download = 'Excusa Aprendiz';
    a.click();
    window.URL.revokeObjectURL(downloadUrl);
  },
  (error) => {
    console.error('Error al descargar el archivo:', error);
  });
}
}
