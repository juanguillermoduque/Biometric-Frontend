import { ComponentFixture, TestBed } from '@angular/core/testing';

import { GenerarReporteFichaComponent } from './generar-reporte-ficha.component';

describe('GenerarReporteFichaComponent', () => {
  let component: GenerarReporteFichaComponent;
  let fixture: ComponentFixture<GenerarReporteFichaComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ GenerarReporteFichaComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(GenerarReporteFichaComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
