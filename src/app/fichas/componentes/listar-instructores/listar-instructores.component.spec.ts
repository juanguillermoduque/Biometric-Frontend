import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ListarInstructoresComponent } from './listar-instructores.component';

describe('ListarInstructoresComponent', () => {
  let component: ListarInstructoresComponent;
  let fixture: ComponentFixture<ListarInstructoresComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ListarInstructoresComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ListarInstructoresComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
