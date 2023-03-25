import { ComponentFixture, TestBed } from '@angular/core/testing';

import { VisualziarFichasComponent } from './visualziar-fichas.component';

describe('VisualziarFichasComponent', () => {
  let component: VisualziarFichasComponent;
  let fixture: ComponentFixture<VisualziarFichasComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ VisualziarFichasComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(VisualziarFichasComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
