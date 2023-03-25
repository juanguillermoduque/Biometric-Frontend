import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AsignarFichasComponent } from './asignar-fichas.component';

describe('AsignarFichasComponent', () => {
  let component: AsignarFichasComponent;
  let fixture: ComponentFixture<AsignarFichasComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ AsignarFichasComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(AsignarFichasComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
