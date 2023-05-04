import { __decorate } from "tslib";
import { Component } from '@angular/core';
import { AgregarUsuarioComponent } from './agregar-usuario/agregar-usuario.component';
var UsuariosComponent = /** @class */ (function () {
    function UsuariosComponent(usuarioService, dialog) {
        this.usuarioService = usuarioService;
        this.dialog = dialog;
        this.displayedColumns = ['NombreUsuario', 'TipoDocumento', 'NumeroDocumento', 'CorreoElectronico', 'NumeroFicha', 'Telefono', 'RolSistema', 'edit'];
        this.usuarios = [];
        this.dataSource = this.usuarios;
    }
    UsuariosComponent.prototype.ngOnInit = function () {
        var _this = this;
        this.usuarioService.getUsuarios().subscribe(function (res) {
            _this.usuarios = res;
            console.log(_this.usuarios);
        }, function (err) { return console.error(err); });
    };
    UsuariosComponent.prototype.nuevoUsuario = function () {
        this.dialog.open(AgregarUsuarioComponent, {
            width: '1000px',
            height: '1000px'
        });
    };
    UsuariosComponent = __decorate([
        Component({
            selector: 'app-usuarios',
            templateUrl: './usuarios.component.html',
            styleUrls: ['./usuarios.component.css']
        })
    ], UsuariosComponent);
    return UsuariosComponent;
}());
export { UsuariosComponent };
//# sourceMappingURL=usuarios.component.js.map