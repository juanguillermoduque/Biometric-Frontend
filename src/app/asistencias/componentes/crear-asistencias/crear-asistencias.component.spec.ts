import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CrearAsistenciasComponent } from './crear-asistencias.component';

describe('CrearAsistenciasComponent', () => {
  let component: CrearAsistenciasComponent;
  let fixture: ComponentFixture<CrearAsistenciasComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ CrearAsistenciasComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(CrearAsistenciasComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
