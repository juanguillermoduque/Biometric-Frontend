import { __decorate } from "tslib";
import { Component } from '@angular/core';
var EditarAsistenciasComponent = /** @class */ (function () {
    function EditarAsistenciasComponent(asistenciasService, activeRouted) {
        this.asistenciasService = asistenciasService;
        this.activeRouted = activeRouted;
        this.asistencia = {
            idasistencia: 0,
            date_enter: '',
            date_start: '',
            date_end: '',
            aula: 0,
            Estado: '',
            comments: '',
            created_at: '',
            updated_at: ''
        };
        this.params = this.activeRouted.snapshot.params;
    }
    EditarAsistenciasComponent.prototype.ngOnInit = function () {
        if (this.params['id']) {
            this.asistenciasService.getAsistencia(this.params['id'])
                .subscribe(function (res) {
                console.log(res);
            }, function (err) { return console.error(err); });
        }
    };
    EditarAsistenciasComponent.prototype.modificarAsistencia = function () {
        delete this.asistencia.created_at;
        delete this.asistencia.updated_at;
        delete this.asistencia.date_enter;
        delete this.asistencia.date_start;
        delete this.asistencia.date_end;
        this.asistenciasService.updateAsistencia(this.params['id'], this.asistencia)
            .subscribe(function (res) {
            console.log(res);
        }, function (err) { return console.error(err); });
    };
    EditarAsistenciasComponent = __decorate([
        Component({
            selector: 'app-editar-asistencias',
            templateUrl: './editar-asistencias.component.html',
            styleUrls: ['./editar-asistencias.component.css']
        })
    ], EditarAsistenciasComponent);
    return EditarAsistenciasComponent;
}());
export { EditarAsistenciasComponent };
//# sourceMappingURL=editar-asistencias.component.js.map