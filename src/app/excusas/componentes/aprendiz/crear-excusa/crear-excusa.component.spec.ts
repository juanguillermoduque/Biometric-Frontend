import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CrearExcusaComponent } from './crear-excusa.component';

describe('CrearExcusaComponent', () => {
  let component: CrearExcusaComponent;
  let fixture: ComponentFixture<CrearExcusaComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ CrearExcusaComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(CrearExcusaComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
