import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CrearCompetenciasComponent } from './crear-competencias.component';

describe('CrearCompetenciasComponent', () => {
  let component: CrearCompetenciasComponent;
  let fixture: ComponentFixture<CrearCompetenciasComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ CrearCompetenciasComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(CrearCompetenciasComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
