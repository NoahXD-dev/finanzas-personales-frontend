import { TestBed } from '@angular/core/testing';
import { provideRouter, Router, UrlTree, type GuardResult } from '@angular/router';
import { firstValueFrom, isObservable, of } from 'rxjs';

import { AuthService } from './auth.service';
import { superGuard } from './super.guard';

async function runSuperGuard(): Promise<GuardResult> {
  const result = TestBed.runInInjectionContext(() =>
    superGuard({} as never, {} as never),
  );
  if (isObservable(result)) {
    return firstValueFrom(result);
  }
  return result;
}

describe('superGuard', () => {
  let auth: { ensureUser: ReturnType<typeof vi.fn> };
  let router: Router;

  beforeEach(() => {
    auth = {
      ensureUser: vi.fn(),
    };
    TestBed.configureTestingModule({
      providers: [
        provideRouter([]),
        { provide: AuthService, useValue: auth },
      ],
    });
    router = TestBed.inject(Router);
  });

  it('allows access for super role', async () => {
    auth.ensureUser.mockReturnValue(
      of({
        id: 1,
        name: 'Admin',
        email: 'super@test.com',
        role: 'super',
        status: true,
      }),
    );
    const result = TestBed.runInInjectionContext(() =>
      superGuard({} as never, {} as never),
    );
    expect(isObservable(result)).toBe(true);
    expect(await runSuperGuard()).toBe(true);
  });

  it('redirects non-super to dashboard', async () => {
    auth.ensureUser.mockReturnValue(
      of({
        id: 2,
        name: 'User',
        email: 'user@test.com',
        role: 'user',
        status: true,
      }),
    );
    const tree = (await runSuperGuard()) as UrlTree;
    expect(router.serializeUrl(tree)).toBe('/dashboard');
  });

  it('redirects when user is null', async () => {
    auth.ensureUser.mockReturnValue(of(null));
    const tree = (await runSuperGuard()) as UrlTree;
    expect(router.serializeUrl(tree)).toBe('/dashboard');
  });
});
