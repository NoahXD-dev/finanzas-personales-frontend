import { TestBed } from '@angular/core/testing';
import { of, throwError } from 'rxjs';

import { UsersService } from './users.service';
import { UsersComponent } from './users.component';

describe('UsersComponent', () => {
  let usersService: {
    findAll: ReturnType<typeof vi.fn>;
    setUserStatus: ReturnType<typeof vi.fn>;
  };

  beforeEach(async () => {
    usersService = {
      findAll: vi.fn().mockReturnValue(
        of([
          {
            id: '1',
            name: 'Super Admin',
            email: 'super@test.com',
            role: 'super',
            status: true,
          },
          {
            id: '2',
            name: 'Regular',
            email: 'user@test.com',
            role: 'user',
            status: true,
          },
        ]),
      ),
      setUserStatus: vi.fn(),
    };

    await TestBed.configureTestingModule({
      imports: [UsersComponent],
      providers: [{ provide: UsersService, useValue: usersService }],
    }).compileComponents();
  });

  it('should create', () => {
    const fixture = TestBed.createComponent(UsersComponent);
    expect(fixture.componentInstance).toBeTruthy();
  });

  it('should list users and hide inactivate for active super', async () => {
    const fixture = TestBed.createComponent(UsersComponent);
    fixture.detectChanges();
    await fixture.whenStable();
    fixture.detectChanges();
    const compiled = fixture.nativeElement as HTMLElement;
    expect(compiled.textContent).toContain('Super Admin');
    expect(compiled.textContent).toContain('Regular');
    expect(compiled.textContent).toContain('Inactivar');
    const buttons = compiled.querySelectorAll('button');
    expect(buttons.length).toBe(1);
  });

  it('should call setUserStatus when toggling a regular user', async () => {
    usersService.setUserStatus.mockReturnValue(
      of({
        id: '2',
        name: 'Regular',
        email: 'user@test.com',
        role: 'user',
        status: false,
      }),
    );
    const fixture = TestBed.createComponent(UsersComponent);
    fixture.detectChanges();
    await fixture.whenStable();
    fixture.detectChanges();
    const button = fixture.nativeElement.querySelector(
      'button',
    ) as HTMLButtonElement;
    button.click();
    fixture.detectChanges();
    expect(usersService.setUserStatus).toHaveBeenCalledWith('2', false);
  });

  it('should show mutation error', async () => {
    usersService.setUserStatus.mockReturnValue(
      throwError(() => new Error('Forbidden')),
    );
    const fixture = TestBed.createComponent(UsersComponent);
    fixture.detectChanges();
    await fixture.whenStable();
    fixture.detectChanges();
    const button = fixture.nativeElement.querySelector(
      'button',
    ) as HTMLButtonElement;
    button.click();
    fixture.detectChanges();
    await fixture.whenStable();
    fixture.detectChanges();
    expect(fixture.nativeElement.textContent).toContain('Forbidden');
  });
});
