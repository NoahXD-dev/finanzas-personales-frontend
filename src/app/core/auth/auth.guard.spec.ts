import { TestBed } from '@angular/core/testing';
import { provideRouter } from '@angular/router';
import {
  ActivatedRouteSnapshot,
  Router,
  RouterStateSnapshot,
} from '@angular/router';

import { authGuard } from './auth.guard';
import { TokenStore } from './token.store';

describe('authGuard', () => {
  let tokenStore: TokenStore;
  let router: Router;

  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [TokenStore, provideRouter([])],
    });
    tokenStore = TestBed.inject(TokenStore);
    router = TestBed.inject(Router);
    tokenStore.clear();
  });

  it('redirects to login when there is no token', () => {
    const result = TestBed.runInInjectionContext(() =>
      authGuard(
        {} as ActivatedRouteSnapshot,
        { url: '/dashboard' } as RouterStateSnapshot,
      ),
    );
    expect(result).toEqual(
      router.createUrlTree(['/login'], {
        queryParams: { returnUrl: '/dashboard' },
      }),
    );
  });

  it('allows access when a token exists', () => {
    tokenStore.set('test-token');
    const result = TestBed.runInInjectionContext(() =>
      authGuard(
        {} as ActivatedRouteSnapshot,
        { url: '/dashboard' } as RouterStateSnapshot,
      ),
    );
    expect(result).toBe(true);
  });
});
