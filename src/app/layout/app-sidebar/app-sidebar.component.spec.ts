import { TestBed } from '@angular/core/testing';
import { provideRouter } from '@angular/router';
import { of } from 'rxjs';

import { AuthService } from '../../core/auth/auth.service';
import { AppSidebarComponent } from './app-sidebar.component';

describe('AppSidebarComponent', () => {
  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [AppSidebarComponent],
      providers: [
        provideRouter([]),
        {
          provide: AuthService,
          useValue: {
            user: () => ({
              id: 1,
              name: 'Test User',
              email: 'test@example.com',
              role: 'user',
              status: true,
            }),
            logout: () => of(true),
          },
        },
      ],
    }).compileComponents();
  });

  it('should create', () => {
    const fixture = TestBed.createComponent(AppSidebarComponent);
    expect(fixture.componentInstance).toBeTruthy();
  });

  it('should render dashboard link and logout', async () => {
    const fixture = TestBed.createComponent(AppSidebarComponent);
    await fixture.whenStable();
    fixture.detectChanges();
    const compiled = fixture.nativeElement as HTMLElement;
    expect(compiled.textContent).toContain('Dashboard');
    expect(compiled.textContent).toContain('Cerrar sesión');
  });
});
