import { __awaiter, __generator } from "tslib";
import { TestBed } from '@angular/core/testing';
import { EditarAsistenciasComponent } from './editar-asistencias.component';
describe('EditarAsistenciasComponent', function () {
    var component;
    var fixture;
    beforeEach(function () { return __awaiter(void 0, void 0, void 0, function () {
        return __generator(this, function (_a) {
            switch (_a.label) {
                case 0: return [4 /*yield*/, TestBed.configureTestingModule({
                        declarations: [EditarAsistenciasComponent]
                    })
                        .compileComponents()];
                case 1:
                    _a.sent();
                    fixture = TestBed.createComponent(EditarAsistenciasComponent);
                    component = fixture.componentInstance;
                    fixture.detectChanges();
                    return [2 /*return*/];
            }
        });
    }); });
    it('should create', function () {
        expect(component).toBeTruthy();
    });
});
//# sourceMappingURL=editar-asistencias.component.spec.js.map