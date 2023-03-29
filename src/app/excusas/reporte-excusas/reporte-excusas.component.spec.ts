import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ReporteExcusasComponent } from './reporte-excusas.component';

describe('ReporteExcusasComponent', () => {
  let component: ReporteExcusasComponent;
  let fixture: ComponentFixture<ReporteExcusasComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ReporteExcusasComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ReporteExcusasComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
