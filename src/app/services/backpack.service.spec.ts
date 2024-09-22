import { TestBed } from '@angular/core/testing';

import { BackpackService } from './backpack.service';

describe('BackpackService', () => {
  let service: BackpackService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(BackpackService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
