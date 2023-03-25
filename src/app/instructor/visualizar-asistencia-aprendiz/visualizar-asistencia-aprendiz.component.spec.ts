import { ComponentFixture, TestBed } from '@angular/core/testing';

import { VisualizarAsistenciaAprendizComponent } from './visualizar-asistencia-aprendiz.component';

describe('VisualizarAsistenciaAprendizComponent', () => {
  let component: VisualizarAsistenciaAprendizComponent;
  let fixture: ComponentFixture<VisualizarAsistenciaAprendizComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ VisualizarAsistenciaAprendizComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(VisualizarAsistenciaAprendizComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
