import { TestBed } from '@angular/core/testing';
import { provideRouter } from '@angular/router';

import { AuthService } from '../../../core/auth/auth.service';
import { LoginComponent } from './login.component';

describe('LoginComponent', () => {
  const loginSpy = vi.fn();

  beforeEach(async () => {
    loginSpy.mockReset();
    await TestBed.configureTestingModule({
      imports: [LoginComponent],
      providers: [
        provideRouter([]),
        {
          provide: AuthService,
          useValue: {
            login: loginSpy,
          },
        },
      ],
    }).compileComponents();
  });

  it('should render email and password fields', async () => {
    const fixture = TestBed.createComponent(LoginComponent);
    await fixture.whenStable();
    fixture.detectChanges();
    const compiled = fixture.nativeElement as HTMLElement;
    expect(compiled.querySelector('#login-email')).toBeTruthy();
    expect(compiled.querySelector('#login-password')).toBeTruthy();
    expect(compiled.querySelector('a[href="/register"]')).toBeTruthy();
  });

  it('should not call login when the form is empty', async () => {
    const fixture = TestBed.createComponent(LoginComponent);
    await fixture.whenStable();
    fixture.detectChanges();
    fixture.componentInstance.onSubmit();
    expect(loginSpy).not.toHaveBeenCalled();
  });
});
