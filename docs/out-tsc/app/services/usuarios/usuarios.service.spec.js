import { TestBed } from '@angular/core/testing';
import { UsuariosService } from './usuarios.service';
describe('UsuariosService', function () {
    var service;
    beforeEach(function () {
        TestBed.configureTestingModule({});
        service = TestBed.inject(UsuariosService);
    });
    it('should be created', function () {
        expect(service).toBeTruthy();
    });
});
//# sourceMappingURL=usuarios.service.spec.js.map