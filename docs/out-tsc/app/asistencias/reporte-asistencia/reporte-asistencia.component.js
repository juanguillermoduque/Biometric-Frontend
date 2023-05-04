import { __decorate } from "tslib";
import { Component } from '@angular/core';
var ReporteAsistenciaComponent = /** @class */ (function () {
    function ReporteAsistenciaComponent(_snackBar) {
        this._snackBar = _snackBar;
        this.numeroFicha = '';
        this.reporte = '';
    }
    ReporteAsistenciaComponent.prototype.enviarReporte = function () {
        if (!this.numeroFicha || !this.reporte) {
            this._snackBar.open('Por favor completa todos los campos.', 'Cerrar', {
                duration: 5000,
                horizontalPosition: 'center',
                verticalPosition: 'top'
            });
        }
        else {
            this.numeroFicha = '';
            this.reporte = '';
            this._snackBar.open('Reporte enviado exitosamente.', 'Cerrar', {
                duration: 5000,
                horizontalPosition: 'center',
                verticalPosition: 'top'
            });
        }
    };
    ReporteAsistenciaComponent = __decorate([
        Component({
            selector: 'app-reporte-asistencia',
            templateUrl: './reporte-asistencia.component.html',
            styleUrls: ['./reporte-asistencia.component.css']
        })
    ], ReporteAsistenciaComponent);
    return ReporteAsistenciaComponent;
}());
export { ReporteAsistenciaComponent };
//# sourceMappingURL=reporte-asistencia.component.js.map