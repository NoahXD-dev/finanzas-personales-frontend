import { TestBed } from '@angular/core/testing';
import { provideRouter } from '@angular/router';
import { of } from 'rxjs';

import { AuthService } from '../../core/auth/auth.service';
import type { AuthUser } from '../../core/auth/auth.model';
import { AppSidebarComponent } from './app-sidebar.component';

function createAuthMock(user: AuthUser) {
  return {
    user: () => user,
    logout: () => of(true),
  };
}

describe('AppSidebarComponent', () => {
  it('should create', async () => {
    await TestBed.configureTestingModule({
      imports: [AppSidebarComponent],
      providers: [
        provideRouter([]),
        {
          provide: AuthService,
          useValue: createAuthMock({
            id: 1,
            name: 'Test User',
            email: 'test@example.com',
            role: 'user',
            status: true,
          }),
        },
      ],
    }).compileComponents();
    const fixture = TestBed.createComponent(AppSidebarComponent);
    expect(fixture.componentInstance).toBeTruthy();
  });

  it('should render dashboard link and logout', async () => {
    await TestBed.configureTestingModule({
      imports: [AppSidebarComponent],
      providers: [
        provideRouter([]),
        {
          provide: AuthService,
          useValue: createAuthMock({
            id: 1,
            name: 'Test User',
            email: 'test@example.com',
            role: 'user',
            status: true,
          }),
        },
      ],
    }).compileComponents();
    const fixture = TestBed.createComponent(AppSidebarComponent);
    await fixture.whenStable();
    fixture.detectChanges();
    const compiled = fixture.nativeElement as HTMLElement;
    expect(compiled.textContent).toContain('Dashboard');
    expect(compiled.textContent).toContain('Cerrar sesión');
  });

  it('should not show Usuarios link for regular user', async () => {
    await TestBed.configureTestingModule({
      imports: [AppSidebarComponent],
      providers: [
        provideRouter([]),
        {
          provide: AuthService,
          useValue: createAuthMock({
            id: 1,
            name: 'Test User',
            email: 'test@example.com',
            role: 'user',
            status: true,
          }),
        },
      ],
    }).compileComponents();
    const fixture = TestBed.createComponent(AppSidebarComponent);
    await fixture.whenStable();
    fixture.detectChanges();
    expect(fixture.nativeElement.textContent).not.toContain('Usuarios');
  });

  it('should show Usuarios link for super user', async () => {
    await TestBed.configureTestingModule({
      imports: [AppSidebarComponent],
      providers: [
        provideRouter([]),
        {
          provide: AuthService,
          useValue: createAuthMock({
            id: 1,
            name: 'Super User',
            email: 'super@example.com',
            role: 'super',
            status: true,
          }),
        },
      ],
    }).compileComponents();
    const fixture = TestBed.createComponent(AppSidebarComponent);
    await fixture.whenStable();
    fixture.detectChanges();
    expect(fixture.nativeElement.textContent).toContain('Usuarios');
  });
});
