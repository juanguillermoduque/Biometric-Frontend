import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CrearHorariosComponent } from './crear-horarios.component';

describe('CrearHorariosComponent', () => {
  let component: CrearHorariosComponent;
  let fixture: ComponentFixture<CrearHorariosComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ CrearHorariosComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(CrearHorariosComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
