import { __decorate } from "tslib";
import { Injectable } from '@angular/core';
var FichasService = /** @class */ (function () {
    function FichasService(http) {
        this.http = http;
        this.API_URI = 'http://localhost:3000/api';
    }
    FichasService.prototype.getFichas = function () {
        return this.http.get("".concat(this.API_URI, "/fichas/"));
    };
    FichasService.prototype.getFicha = function (id) {
        return this.http.get("".concat(this.API_URI, "/fichas/").concat(id));
    };
    FichasService.prototype.saveFicha = function (ficha) {
        return this.http.post("".concat(this.API_URI, "/fichas/"), ficha);
    };
    FichasService.prototype.updateFicha = function (id, ficha) {
        return this.http.put("".concat(this.API_URI, "/fichas/editar").concat(id), ficha);
    };
    FichasService = __decorate([
        Injectable({
            providedIn: 'root'
        })
    ], FichasService);
    return FichasService;
}());
export { FichasService };
//# sourceMappingURL=fichas.service.js.map