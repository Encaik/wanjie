import { TestBed } from '@angular/core/testing';

import { KimiService } from './kimi.service';

describe('KimiService', () => {
  let service: KimiService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(KimiService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
