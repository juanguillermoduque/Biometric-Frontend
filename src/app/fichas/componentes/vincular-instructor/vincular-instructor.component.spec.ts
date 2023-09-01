import { ComponentFixture, TestBed } from '@angular/core/testing';

import { VincularInstructorComponent } from './vincular-instructor.component';

describe('VincularInstructorComponent', () => {
  let component: VincularInstructorComponent;
  let fixture: ComponentFixture<VincularInstructorComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ VincularInstructorComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(VincularInstructorComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
