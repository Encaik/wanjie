import { inject } from '@angular/core';
import { CanActivateFn, Router } from '@angular/router';
import { RuntimeService } from '../services/runtime.service';

export const startPageGuard: CanActivateFn = (route, state) => {
  const router = inject(Router);
  const rtSrv = inject(RuntimeService);
  if (!rtSrv.isInit) router.navigate(['/home']);
  return true;
};
