import { ComponentFixture, TestBed } from '@angular/core/testing';

import { VisualizarEscusaComponent } from './visualizar-escusa.component';

describe('VisualizarEscusaComponent', () => {
  let component: VisualizarEscusaComponent;
  let fixture: ComponentFixture<VisualizarEscusaComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ VisualizarEscusaComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(VisualizarEscusaComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
