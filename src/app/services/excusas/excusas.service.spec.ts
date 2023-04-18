import { TestBed } from '@angular/core/testing';

import { ExcusasService } from './excusas.service';

describe('ExcusasService', () => {
  let service: ExcusasService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(ExcusasService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
