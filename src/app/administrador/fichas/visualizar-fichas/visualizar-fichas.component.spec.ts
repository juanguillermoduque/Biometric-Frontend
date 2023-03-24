import { ComponentFixture, TestBed } from '@angular/core/testing';

import { VisualizarFichasComponent } from './visualizar-fichas.component';

describe('VisualizarFichasComponent', () => {
  let component: VisualizarFichasComponent;
  let fixture: ComponentFixture<VisualizarFichasComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ VisualizarFichasComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(VisualizarFichasComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
