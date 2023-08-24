import { ComponentFixture, TestBed } from '@angular/core/testing';

import { FichasInstructorComponent } from './fichas-instructor.component';

describe('FichasInstructorComponent', () => {
  let component: FichasInstructorComponent;
  let fixture: ComponentFixture<FichasInstructorComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ FichasInstructorComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(FichasInstructorComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
