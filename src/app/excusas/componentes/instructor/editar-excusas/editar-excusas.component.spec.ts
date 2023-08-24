import { ComponentFixture, TestBed } from '@angular/core/testing';

import { EditarExcusasComponent } from './editar-excusas.component';

describe('EditarExcusasComponent', () => {
  let component: EditarExcusasComponent;
  let fixture: ComponentFixture<EditarExcusasComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ EditarExcusasComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(EditarExcusasComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
