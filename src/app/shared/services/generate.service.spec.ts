import { TestBed } from '@angular/core/testing';

import { GenerateService } from './generate.service';
import { provideHttpClient } from '@angular/common/http';

describe('GenerateService', () => {
  let service: GenerateService;

  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [provideHttpClient()]
    });
    service = TestBed.inject(GenerateService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
