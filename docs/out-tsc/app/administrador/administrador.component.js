import { __decorate } from "tslib";
import { Component } from '@angular/core';
var AdministradorComponent = /** @class */ (function () {
    function AdministradorComponent() {
        this.activaOpcion = 0;
    }
    AdministradorComponent.prototype.ngOnInit = function () {
        this.activaOpcion = 0;
    };
    AdministradorComponent.prototype.AccionAdmin = function (num) {
        this.activaOpcion = num;
    };
    AdministradorComponent = __decorate([
        Component({
            selector: 'app-administrador',
            templateUrl: './administrador.component.html',
            styleUrls: ['./administrador.component.css']
        })
    ], AdministradorComponent);
    return AdministradorComponent;
}());
export { AdministradorComponent };
//# sourceMappingURL=administrador.component.js.map