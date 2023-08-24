import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ListarExcusaComponent } from './listar-excusa.component';

describe('ListarExcusaComponent', () => {
  let component: ListarExcusaComponent;
  let fixture: ComponentFixture<ListarExcusaComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ListarExcusaComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ListarExcusaComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
