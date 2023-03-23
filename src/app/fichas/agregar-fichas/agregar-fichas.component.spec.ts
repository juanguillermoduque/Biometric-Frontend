import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AgregarFichasComponent } from './agregar-fichas.component';

describe('AgregarFichasComponent', () => {
  let component: AgregarFichasComponent;
  let fixture: ComponentFixture<AgregarFichasComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ AgregarFichasComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(AgregarFichasComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
