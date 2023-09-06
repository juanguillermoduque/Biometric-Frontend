import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ListarAprendicesComponent } from './listar-aprendices.component';

describe('ListarAprendicesComponent', () => {
  let component: ListarAprendicesComponent;
  let fixture: ComponentFixture<ListarAprendicesComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ListarAprendicesComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ListarAprendicesComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
