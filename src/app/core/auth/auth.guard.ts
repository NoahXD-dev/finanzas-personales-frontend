import { inject } from '@angular/core';
import { CanActivateFn, Router } from '@angular/router';

import { TokenStore } from './token.store';

function safeReturnUrl(url: string): string | null {
  if (!url.startsWith('/') || url.startsWith('//')) {
    return null;
  }
  return url;
}

export const authGuard: CanActivateFn = (route, state) => {
  const tokenStore = inject(TokenStore);
  const router = inject(Router);

  if (tokenStore.get() !== null) {
    return true;
  }

  const returnUrl = safeReturnUrl(state.url);
  return router.createUrlTree(['/login'], {
    queryParams: returnUrl ? { returnUrl } : undefined,
  });
};
