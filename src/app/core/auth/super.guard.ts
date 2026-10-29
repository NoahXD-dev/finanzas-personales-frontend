import { inject } from '@angular/core';
import { CanActivateFn, Router } from '@angular/router';
import { map } from 'rxjs';

import { AuthService } from './auth.service';

export const superGuard: CanActivateFn = () => {
  const auth = inject(AuthService);
  const router = inject(Router);

  return auth.ensureUser().pipe(
    map((user) => {
      if (user?.role === 'super') {
        return true;
      }
      return router.createUrlTree(['/dashboard']);
    }),
  );
};
