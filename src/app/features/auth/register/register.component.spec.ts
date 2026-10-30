import { TestBed } from '@angular/core/testing';
import { provideRouter } from '@angular/router';

import { AuthService } from '../../../core/auth/auth.service';
import { RegisterComponent } from './register.component';

describe('RegisterComponent', () => {
  const registerSpy = vi.fn();

  beforeEach(async () => {
    registerSpy.mockReset();
    await TestBed.configureTestingModule({
      imports: [RegisterComponent],
      providers: [
        provideRouter([]),
        {
          provide: AuthService,
          useValue: {
            register: registerSpy,
          },
        },
      ],
    }).compileComponents();
  });

  it('should render name, email and password fields', async () => {
    const fixture = TestBed.createComponent(RegisterComponent);
    await fixture.whenStable();
    fixture.detectChanges();
    const compiled = fixture.nativeElement as HTMLElement;
    expect(compiled.querySelector('#register-name')).toBeTruthy();
    expect(compiled.querySelector('#register-email')).toBeTruthy();
    expect(compiled.querySelector('#register-password')).toBeTruthy();
    expect(compiled.querySelector('#register-confirm-password')).toBeTruthy();
  });

  it('should not call register when the form is empty', async () => {
    const fixture = TestBed.createComponent(RegisterComponent);
    await fixture.whenStable();
    fixture.detectChanges();
    fixture.componentInstance.onSubmit();
    expect(registerSpy).not.toHaveBeenCalled();
  });

  it('should not call register when passwords differ', async () => {
    const fixture = TestBed.createComponent(RegisterComponent);
    await fixture.whenStable();
    fixture.detectChanges();
    fixture.componentInstance.form.setValue({
      name: 'Ana',
      email: 'ana@test.com',
      password: 'secret',
      confirmPassword: 'other',
    });
    fixture.componentInstance.onSubmit();
    expect(registerSpy).not.toHaveBeenCalled();
  });
});
