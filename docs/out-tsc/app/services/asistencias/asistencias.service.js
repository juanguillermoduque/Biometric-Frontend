import { __decorate } from "tslib";
import { Injectable } from '@angular/core';
var AsistenciasService = /** @class */ (function () {
    function AsistenciasService(http) {
        this.http = http;
        this.API_URI = 'http://localhost:3000/api';
    }
    AsistenciasService.prototype.getAsistencias = function () {
        return this.http.get("".concat(this.API_URI, "/asistencias/"));
    };
    AsistenciasService.prototype.getAsistencia = function (id) {
        return this.http.get("".concat(this.API_URI, "/asistencias/").concat(id));
    };
    AsistenciasService.prototype.saveAsistencia = function (asistenci) {
        return this.http.post("".concat(this.API_URI, "/asistencias/"), asistenci);
    };
    AsistenciasService.prototype.updateAsistencia = function (id, asistenci) {
        return this.http.put("".concat(this.API_URI, "/asistencias/editar").concat(id), asistenci);
    };
    AsistenciasService = __decorate([
        Injectable({
            providedIn: 'root'
        })
    ], AsistenciasService);
    return AsistenciasService;
}());
export { AsistenciasService };
//# sourceMappingURL=asistencias.service.js.map