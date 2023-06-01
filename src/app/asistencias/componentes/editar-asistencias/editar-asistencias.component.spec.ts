import { ComponentFixture, TestBed } from '@angular/core/testing';

import { EditarAsistenciasComponent } from './editar-asistencias.component';

describe('EditarAsistenciasComponent', () => {
  let component: EditarAsistenciasComponent;
  let fixture: ComponentFixture<EditarAsistenciasComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ EditarAsistenciasComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(EditarAsistenciasComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
