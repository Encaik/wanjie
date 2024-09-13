import { TestBed } from '@angular/core/testing';
import { CanActivateFn } from '@angular/router';

import { startPageGuard } from './start-page.guard';

describe('startPageGuard', () => {
  const executeGuard: CanActivateFn = (...guardParameters) => TestBed.runInInjectionContext(() => startPageGuard(...guardParameters));

  beforeEach(() => {
    TestBed.configureTestingModule({});
  });

  it('should be created', () => {
    expect(executeGuard).toBeTruthy();
  });
});
