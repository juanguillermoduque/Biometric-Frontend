import { Injectable } from '@angular/core';
import * as XLSX from 'xlsx';
import * as FileSaver from 'file-saver';

const EXCEL_TYPE = 
'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet; charset=UTF-8';

const EXCEL_EXT = '.xlsx'

@Injectable({
  providedIn: 'root'
})
export class ExportService {

  constructor() { }

  exportExcel(json:any[],excelFileName : string):void{

    const worksheet : XLSX.WorkSheet = XLSX.utils.json_to_sheet(json)
    const workbook: XLSX.WorkBook = {Sheets:{'data' : worksheet},SheetNames:['data']};  
    const excelBuffer : any = XLSX.write(workbook,{bookType:'xlsx',type:'array'});

    //metodo que guarda el fichero

    this.saveExcel(excelBuffer,excelFileName);

  }

  private saveExcel(buffer:any,fileName:string):void{
    const data: Blob = new Blob([buffer],{type:EXCEL_TYPE});
    FileSaver.saveAs(data,fileName + EXCEL_EXT)
  }
}
