import { Component, OnInit } from '@angular/core';
import { FichasService } from '../../fichas.service';
import {MatDialog} from '@angular/material/dialog';
import { AgregarFichasComponent } from '../agregar-fichas/agregar-fichas.component';
import { EditarFichasComponent } from '../editar-fichas/editar-fichas.component';
import { query } from '@angular/animations';
import { FormControl } from '@angular/forms';
import { debounce, debounceTime } from 'rxjs';
import { MatTableDataSource } from '@angular/material/table';
import { ExportService } from 'src/app/utils/export/export.service';
import { ImportService } from 'src/app/utils/import/import.service';
import { ficha } from '../../fichas';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-fichas',
  templateUrl: './fichas.component.html',
  styleUrls: ['./fichas.component.css']
})
export class FichasComponent implements OnInit {
  fichas:any = [];
  dataSource = this.fichas;
  control = new FormControl();
  data: any[][] = [];

  constructor(
    private fichaService: FichasService,
    public dialog: MatDialog,
    private exportService:ExportService,
    private importService:ImportService
    ){}
  ngOnInit(){ 
  this.getFichas();
  this.searchFicha();
  }

  getFichas(){
    this.fichaService.getFichas().subscribe(
      res =>{
        this.fichas = res;
      },
      err=>console.error(err)
    ) 
  }
  agregarFicha(){
    this.dialog.open(AgregarFichasComponent, {
      height: '400px',
      width: '400px',
      panelClass: 'custom-dialog-create-update'
    }).afterClosed().subscribe(result => {
      this.getFichas();
    });
  }

  editarFicha(idFicha :number){
    this.dialog.open(EditarFichasComponent, {
      height: '400px',
      width: '400px',
      panelClass: 'custom-dialog-create-update',
      data: idFicha,
    }).afterClosed().subscribe(result => {
      this.getFichas();
    });
  }

  searchFicha(){

    this.control.valueChanges.pipe(
      debounceTime(500)
    ).subscribe(query => {
  
      this.findFichas(query)
    })
  }

  findFichas(query:string){
      if (query == ""){
        this.getFichas()
      }
    
      this.fichaService.search(query).subscribe(
      res=>{
        this.fichas = res;
      },
      err=>{console.log(err)}
    )

  }

  ExportarFichas(){
    let fichas = this.fichas[0];
    for (let i =0; i< fichas.length;i++){
      delete fichas[i].id_ficha;
      delete fichas[i].id_programa;
      delete fichas[i].created_at;
      delete fichas[i].updated_at;
    }
    let dataSourse = new MatTableDataSource(fichas)

    this.exportService.exportExcel(dataSourse.data,"fichas")
    
  }
  async importarFichas(evt: any) {
    try {

      const target: DataTransfer = <DataTransfer>(evt.target);
  
      if (target.files.length !== 1) {
        Swal.fire('Error', 'No se puede usar múltiples archivos', 'error');
        return;
      }
  
      const rows = await this.importService.readExcel(target.files[0]);
      this.data = rows;
      if (this.data[0][0] === 'code_ficha' && this.data[0][1] === 'id_programa') {
        for (let i = 1; i < this.data.length; i++) {
          const isSuccess = await this.guardarFicha(this.data[i][0], this.data[i][1]);
          if (!isSuccess) {
            Swal.fire('Error', 'Datos inválidos', 'error');
            return;  // Si hay un error, sale del bucle y no continúa intentando guardar más fichas.
          }
        }
        Swal.fire({
          position: 'center',
          icon: 'success',
          title: 'Importación Exitosa',
          showConfirmButton: true,
          timer: 1500
        });
      } else {
        Swal.fire('Error', 'Datos inválidos', 'error');
      }
    } catch{
      Swal.fire('Error', 'error');
    }
  
    this.getFichas();
  }
  
  async guardarFicha(code_ficha: number, id_programa: string): Promise<boolean> {
    if (code_ficha === 0 || id_programa === '') {
      Swal.fire({
        icon: 'error',
        title: 'Oops...',
        text: 'Hay campos sin completar',
      });
      return false;
    }
  
    const ficha: ficha = {
      code_ficha: code_ficha,
      id_programa: id_programa
    };
  
    try {
      await this.fichaService.saveFicha(ficha).subscribe(
        (res)=>{
          console.log(res)
        }
      );
      return true;
    } catch (err) {
      console.error(err);
      return false;
    }
  }
}