import { __decorate } from "tslib";
import { Component } from '@angular/core';
import { AgregarFichasComponent } from './agregar-fichas/agregar-fichas.component';
import { EditarFichasComponent } from './editar-fichas/editar-fichas.component';
var FichasComponent = /** @class */ (function () {
    function FichasComponent(fichaService, dialog) {
        this.fichaService = fichaService;
        this.dialog = dialog;
        this.fichas = [];
        this.dataSource = this.fichas;
    }
    FichasComponent.prototype.ngOnInit = function () {
        var _this = this;
        this.fichaService.getFichas().subscribe(function (res) {
            _this.fichas = res;
            console.log(_this.fichas);
        }, function (err) { return console.error(err); });
    };
    FichasComponent.prototype.agregarFicha = function () {
        this.dialog.open(AgregarFichasComponent, {
            height: '500px',
            width: '600px'
        });
    };
    FichasComponent.prototype.editarFicha = function (idFicha) {
        this.dialog.open(EditarFichasComponent, {
            height: '800px',
            width: '600px',
            data: idFicha
        });
    };
    FichasComponent = __decorate([
        Component({
            selector: 'app-fichas',
            templateUrl: './fichas.component.html',
            styleUrls: ['./fichas.component.css']
        })
    ], FichasComponent);
    return FichasComponent;
}());
export { FichasComponent };
//# sourceMappingURL=fichas.component.js.map