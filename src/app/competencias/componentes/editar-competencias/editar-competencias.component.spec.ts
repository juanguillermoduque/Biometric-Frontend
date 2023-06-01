import { ComponentFixture, TestBed } from '@angular/core/testing';

import { EditarCompetenciasComponent } from './editar-competencias.component';

describe('EditarCompetenciasComponent', () => {
  let component: EditarCompetenciasComponent;
  let fixture: ComponentFixture<EditarCompetenciasComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ EditarCompetenciasComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(EditarCompetenciasComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
