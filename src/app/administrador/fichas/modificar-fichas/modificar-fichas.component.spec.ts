import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ModificarFichasComponent } from './modificar-fichas.component';

describe('ModificarFichasComponent', () => {
  let component: ModificarFichasComponent;
  let fixture: ComponentFixture<ModificarFichasComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ModificarFichasComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ModificarFichasComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
