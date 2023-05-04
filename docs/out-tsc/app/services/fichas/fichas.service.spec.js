import { TestBed } from '@angular/core/testing';
import { FichasService } from './fichas.service';
describe('FichasService', function () {
    var service;
    beforeEach(function () {
        TestBed.configureTestingModule({});
        service = TestBed.inject(FichasService);
    });
    it('should be created', function () {
        expect(service).toBeTruthy();
    });
});
//# sourceMappingURL=fichas.service.spec.js.map