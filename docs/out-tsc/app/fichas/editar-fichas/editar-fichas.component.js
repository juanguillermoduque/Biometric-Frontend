import { __decorate, __param } from "tslib";
import { Component, Inject } from '@angular/core';
import { MAT_DIALOG_DATA } from '@angular/material/dialog';
var EditarFichasComponent = /** @class */ (function () {
    function EditarFichasComponent(fichasService, activeRouted, idFicha) {
        this.fichasService = fichasService;
        this.activeRouted = activeRouted;
        this.idFicha = idFicha;
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
        this.params = this.activeRouted.snapshot.params;
    }
    EditarFichasComponent.prototype.ngOnInit = function () {
        if (this.idFicha) {
            this.fichasService.getFicha(this.idFicha)
                .subscribe(function (res) {
                console.log(res);
            }, function (err) { return console.error(err); });
        }
    };
    EditarFichasComponent.prototype.modificarFicha = function () {
        delete this.ficha.created_at;
        delete this.ficha.updated_at;
        delete this.ficha.idficha;
        delete this.ficha.date_end;
        delete this.ficha.date_start;
        this.fichasService.updateFicha(this.idFicha, this.ficha)
            .subscribe(function (res) {
            console.log(res);
        }, function (err) { return console.error(err); });
    };
    EditarFichasComponent = __decorate([
        Component({
            selector: 'app-editar-fichas',
            templateUrl: './editar-fichas.component.html',
            styleUrls: ['./editar-fichas.component.css']
        }),
        __param(2, Inject(MAT_DIALOG_DATA))
    ], EditarFichasComponent);
    return EditarFichasComponent;
}());
export { EditarFichasComponent };
//# sourceMappingURL=editar-fichas.component.js.map