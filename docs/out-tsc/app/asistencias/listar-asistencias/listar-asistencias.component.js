import { __decorate } from "tslib";
import { Component } from '@angular/core';
var ListarAsistenciasComponent = /** @class */ (function () {
    function ListarAsistenciasComponent(asistenciaService) {
        this.asistenciaService = asistenciaService;
        this.displayedColumns = ['fechaIngreso', 'numIngreso', 'asistio', 'noAsistio', 'aula', 'observaciones', 'horaIngreso', 'horaSalida'];
        this.asistencias = [];
        this.dataSource = this.asistencias;
    }
    ListarAsistenciasComponent.prototype.ngOnInit = function () {
        var _this = this;
        this.asistenciaService.getAsistencias().subscribe(function (res) {
            _this.asistencias = res;
            console.log(_this.asistencias);
        }, function (err) { return console.error(err); });
    };
    ListarAsistenciasComponent = __decorate([
        Component({
            selector: 'app-listar-asistencias',
            templateUrl: './listar-asistencias.component.html',
            styleUrls: ['./listar-asistencias.component.css']
        })
    ], ListarAsistenciasComponent);
    return ListarAsistenciasComponent;
}());
export { ListarAsistenciasComponent };
//# sourceMappingURL=listar-asistencias.component.js.map