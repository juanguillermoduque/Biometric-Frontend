import { __decorate } from "tslib";
import { Component } from '@angular/core';
var InstructorComponent = /** @class */ (function () {
    function InstructorComponent(router) {
        this.router = router;
        this.activaOpcion = 0;
        this.fichaSeleccionada = 0;
    }
    InstructorComponent.prototype.AccionInstructor = function (opcion) {
        this.activaOpcion = opcion;
    };
    InstructorComponent.prototype.editarFicha = function (numeroFicha) {
        this.fichaSeleccionada = numeroFicha;
        this.router.navigate(['/editar-ficha', this.fichaSeleccionada]);
    };
    InstructorComponent = __decorate([
        Component({
            selector: 'app-instructor',
            templateUrl: './instructor.component.html',
            styleUrls: ['./instructor.component.css']
        })
    ], InstructorComponent);
    return InstructorComponent;
}());
export { InstructorComponent };
//# sourceMappingURL=instructor.component.js.map