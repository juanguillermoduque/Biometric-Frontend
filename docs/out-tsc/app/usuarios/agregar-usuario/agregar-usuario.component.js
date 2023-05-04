import { __decorate } from "tslib";
import { Component } from '@angular/core';
var AgregarUsuarioComponent = /** @class */ (function () {
    function AgregarUsuarioComponent(usuariosService) {
        this.usuariosService = usuariosService;
        this.usuario = {
            iduser: 0,
            first_name: '',
            idficha: 0,
            last_name: '',
            type_id: '',
            email: '',
            num_id: 0,
            cellphone: 0,
            rol: '',
            status: '',
            password: '',
            biometric_date: '',
            created_at: '',
            updated_at: ''
        };
    }
    AgregarUsuarioComponent.prototype.ngOnInit = function () {
    };
    AgregarUsuarioComponent.prototype.guardarUsuario = function () {
        delete this.usuario.created_at;
        delete this.usuario.iduser;
        delete this.usuario.updated_at;
        delete this.usuario.biometric_date;
        console.log(this.usuario);
        this.usuariosService.saveUsuario(this.usuario)
            .subscribe(function (res) {
            console.log(res);
        }, function (err) { return console.error(err); });
    };
    AgregarUsuarioComponent = __decorate([
        Component({
            selector: 'app-agregar-usuario',
            templateUrl: './agregar-usuario.component.html',
            styleUrls: ['./agregar-usuario.component.css']
        })
    ], AgregarUsuarioComponent);
    return AgregarUsuarioComponent;
}());
export { AgregarUsuarioComponent };
//# sourceMappingURL=agregar-usuario.component.js.map