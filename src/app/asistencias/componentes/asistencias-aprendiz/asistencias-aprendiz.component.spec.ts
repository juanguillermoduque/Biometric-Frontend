import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AsistenciasAprendizComponent } from './asistencias-aprendiz.component';

describe('AsistenciasAprendizComponent', () => {
  let component: AsistenciasAprendizComponent;
  let fixture: ComponentFixture<AsistenciasAprendizComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ AsistenciasAprendizComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(AsistenciasAprendizComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
