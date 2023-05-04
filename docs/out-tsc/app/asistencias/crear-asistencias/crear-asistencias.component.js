import { __decorate } from "tslib";
import { Component } from '@angular/core';
var CrearAsistenciasComponent = /** @class */ (function () {
    function CrearAsistenciasComponent(asistenciasService) {
        this.asistenciasService = asistenciasService;
        this.asistencia = {
            idasistencia: 0,
            iduser: 0,
            date_enter: '',
            date_start: '',
            date_end: '',
            aula: 0,
            Estado: '',
            comments: '',
            created_at: '',
            updated_at: ''
        };
    }
    CrearAsistenciasComponent.prototype.ngOnInit = function () {
    };
    CrearAsistenciasComponent.prototype.guardarAsistencia = function () {
        delete this.asistencia.created_at;
        delete this.asistencia.updated_at;
        delete this.asistencia.date_enter;
        delete this.asistencia.date_start;
        delete this.asistencia.date_end;
        delete this.asistencia.Estado;
        delete this.asistencia.aula;
        delete this.asistencia.idasistencia;
        this.asistenciasService.saveAsistencia(this.asistencia)
            .subscribe(function (res) {
            console.log(res);
        }, function (err) { return console.error(err); });
    };
    CrearAsistenciasComponent = __decorate([
        Component({
            selector: 'app-crear-asistencias',
            templateUrl: './crear-asistencias.component.html',
            styleUrls: ['./crear-asistencias.component.css']
        })
    ], CrearAsistenciasComponent);
    return CrearAsistenciasComponent;
}());
export { CrearAsistenciasComponent };
//# sourceMappingURL=crear-asistencias.component.js.map