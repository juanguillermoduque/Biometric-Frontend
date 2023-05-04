import { __decorate } from "tslib";
import { Injectable } from '@angular/core';
var UsuariosService = /** @class */ (function () {
    function UsuariosService(http) {
        this.http = http;
        this.API_URI = 'http://localhost:3000/api';
    }
    UsuariosService.prototype.getUsuarios = function () {
        return this.http.get("".concat(this.API_URI, "/usuarios/"));
    };
    UsuariosService.prototype.getUsuario = function (id) {
        return this.http.get("".concat(this.API_URI, "/usuarios/").concat(id));
    };
    UsuariosService.prototype.saveUsuario = function (usuario) {
        return this.http.post("".concat(this.API_URI, "/usuarios/"), usuario);
    };
    UsuariosService.prototype.updateUsuario = function (id, usuario) {
        return this.http.put("".concat(this.API_URI, "/usuarios/editar").concat(id), usuario);
    };
    UsuariosService = __decorate([
        Injectable({
            providedIn: 'root'
        })
    ], UsuariosService);
    return UsuariosService;
}());
export { UsuariosService };
//# sourceMappingURL=usuarios.service.js.map