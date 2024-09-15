import { TestBed } from '@angular/core/testing';
import { CanActivateFn, Router } from '@angular/router';

import { RuntimeService } from '../services/runtime.service';
import { startPageGuard } from './start-page.guard';

describe('startPageGuard', () => {
  let router: jasmine.SpyObj<Router>;
  let runtimeService: jasmine.SpyObj<RuntimeService>;
  const executeGuard: CanActivateFn = (...guardParameters) => TestBed.runInInjectionContext(() => startPageGuard(...guardParameters));

  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [
        { provide: Router, useValue: jasmine.createSpyObj('Router', ['navigate']) },
        { provide: RuntimeService, useValue: jasmine.createSpyObj('RuntimeService', ['isInit']) }
      ]
    });
    router = TestBed.inject(Router) as jasmine.SpyObj<Router>;
    runtimeService = TestBed.inject(RuntimeService) as jasmine.SpyObj<RuntimeService>;
  });

  it('should be created', () => {
    expect(executeGuard).toBeTruthy();
  });

  it('should not redirect if already initialized', () => {
    runtimeService.isInit = true;
    expect(router.navigate).not.toHaveBeenCalled();
    expect(executeGuard).toBeTruthy();
  });
});
