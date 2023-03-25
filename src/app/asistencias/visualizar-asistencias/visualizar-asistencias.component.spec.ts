import { ComponentFixture, TestBed } from '@angular/core/testing';

import { VisualizarAsistenciasComponent } from './visualizar-asistencias.component';

describe('VisualizarAsistenciasComponent', () => {
  let component: VisualizarAsistenciasComponent;
  let fixture: ComponentFixture<VisualizarAsistenciasComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ VisualizarAsistenciasComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(VisualizarAsistenciasComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
