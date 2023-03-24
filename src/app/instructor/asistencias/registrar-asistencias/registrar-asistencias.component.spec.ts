import { ComponentFixture, TestBed } from '@angular/core/testing';

import { RegistrarAsistenciasComponent } from './registrar-asistencias.component';

describe('RegistrarAsistenciasComponent', () => {
  let component: RegistrarAsistenciasComponent;
  let fixture: ComponentFixture<RegistrarAsistenciasComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ RegistrarAsistenciasComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(RegistrarAsistenciasComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
