import { TestBed } from '@angular/core/testing';

import { TimeTickService } from './time-tick.service';

describe('TimeTickService', () => {
  let service: TimeTickService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(TimeTickService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
