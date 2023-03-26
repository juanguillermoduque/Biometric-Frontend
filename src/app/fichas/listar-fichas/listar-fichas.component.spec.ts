import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ListarFichasComponent } from './listar-fichas.component';

describe('ListarFichasComponent', () => {
  let component: ListarFichasComponent;
  let fixture: ComponentFixture<ListarFichasComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ListarFichasComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ListarFichasComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
