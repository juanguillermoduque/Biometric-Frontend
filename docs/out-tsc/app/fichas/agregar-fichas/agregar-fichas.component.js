import { __decorate } from "tslib";
import { Component } from '@angular/core';
var AgregarFichasComponent = /** @class */ (function () {
    function AgregarFichasComponent(fichasService) {
        this.fichasService = fichasService;
        this.ficha = {
            idficha: 0,
            code_ficha: 0,
            name_ficha: '',
            trimester: 0,
            num_Students: 0,
            jornada: '',
            date_start: '',
            date_end: '',
            created_at: '',
            updated_at: ''
        };
    }
    AgregarFichasComponent.prototype.ngOnInit = function () {
    };
    AgregarFichasComponent.prototype.guardarFicha = function () {
        delete this.ficha.created_at;
        delete this.ficha.updated_at;
        delete this.ficha.idficha;
        delete this.ficha.date_end;
        delete this.ficha.date_start;
        this.fichasService.saveFicha(this.ficha)
            .subscribe(function (res) {
            console.log(res);
        }, function (err) { return console.error(err); });
    };
    AgregarFichasComponent = __decorate([
        Component({
            selector: 'app-agregar-fichas',
            templateUrl: './agregar-fichas.component.html',
            styleUrls: ['./agregar-fichas.component.css']
        })
    ], AgregarFichasComponent);
    return AgregarFichasComponent;
}());
export { AgregarFichasComponent };
//# sourceMappingURL=agregar-fichas.component.js.map