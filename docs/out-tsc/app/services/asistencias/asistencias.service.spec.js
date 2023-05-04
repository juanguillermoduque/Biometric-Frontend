import { TestBed } from '@angular/core/testing';
import { AsistenciasService } from './asistencias.service';
describe('AsistenciasService', function () {
    var service;
    beforeEach(function () {
        TestBed.configureTestingModule({});
        service = TestBed.inject(AsistenciasService);
    });
    it('should be created', function () {
        expect(service).toBeTruthy();
    });
});
//# sourceMappingURL=asistencias.service.spec.js.map