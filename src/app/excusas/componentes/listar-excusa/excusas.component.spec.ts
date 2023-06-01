import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ExcusasComponent } from './excusas.component';

describe('ExcusasComponent', () => {
  let component: ExcusasComponent;
  let fixture: ComponentFixture<ExcusasComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ExcusasComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ExcusasComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
