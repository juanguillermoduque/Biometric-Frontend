import { ComponentFixture, TestBed } from '@angular/core/testing';

import { VincularAprendizComponent } from './vincular-aprendiz.component';

describe('VincularAprendizComponent', () => {
  let component: VincularAprendizComponent;
  let fixture: ComponentFixture<VincularAprendizComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ VincularAprendizComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(VincularAprendizComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
