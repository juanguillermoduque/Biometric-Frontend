import { Injectable } from '@angular/core';
import * as XLSX from 'xlsx';

@Injectable({
  providedIn: 'root'
})
export class ImportService {

  constructor() { }

  public readExcel(file: any): Promise<any[][]> {
    return new Promise<any[][]>((resolve, reject) => {
      const reader: FileReader = new FileReader();
      reader.onload = (e: any) => {
        try {
          const bstr: string = e.target.result;
          const wb: XLSX.WorkBook = XLSX.read(bstr, { type: 'binary' });
          const wsname: string = wb.SheetNames[0];
          const ws: XLSX.WorkSheet = wb.Sheets[wsname];
          resolve(XLSX.utils.sheet_to_json(ws, { header: 1 }));
        } catch (error) {
          reject("El archivo no es un formato Excel válido o está corrupto.");
        }
      };

      reader.readAsBinaryString(file);
    });
  }
}
