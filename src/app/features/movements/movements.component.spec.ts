import { TestBed } from '@angular/core/testing';
import { of } from 'rxjs';

import { getCurrentMonthRange } from '../../shared/date/date-range';
import { MovementsComponent } from './movements.component';
import { MovementsService } from './movements.service';

describe('MovementsComponent', () => {
  const findAll = vi.fn(() => of([]));
  const create = vi.fn();

  beforeEach(async () => {
    findAll.mockClear();
    create.mockReset();
    await TestBed.configureTestingModule({
      imports: [MovementsComponent],
      providers: [
        {
          provide: MovementsService,
          useValue: { findAll, create },
        },
      ],
    }).compileComponents();
  });

  it('loads the current month and shows the create action', async () => {
    const fixture = TestBed.createComponent(MovementsComponent);
    await fixture.whenStable();
    fixture.detectChanges();
    const range = getCurrentMonthRange();
    const compiled = fixture.nativeElement as HTMLElement;
    expect(findAll).toHaveBeenCalledWith(range.from, range.to);
    expect(compiled.textContent).toContain('Nuevo movimiento');
    expect(compiled.textContent).toContain('No hay movimientos en este mes.');
  });

  it('does not create a movement when the form is empty', async () => {
    const fixture = TestBed.createComponent(MovementsComponent);
    await fixture.whenStable();
    fixture.detectChanges();
    fixture.componentInstance.onSubmit({ close: vi.fn() });
    expect(create).not.toHaveBeenCalled();
  });

  it('creates a movement and closes the dialog', async () => {
    create.mockReturnValue(
      of({
        id: '1',
        description: 'Café',
        amount: 40,
        type: 'expense',
        category: 'Comida',
        date: '2026-10-30',
      }),
    );
    const fixture = TestBed.createComponent(MovementsComponent);
    await fixture.whenStable();
    fixture.detectChanges();
    fixture.componentInstance.form.setValue({
      description: '  Café  ',
      amount: 40,
      type: 'expense',
      category: ' Comida ',
      date: '2026-10-30',
    });
    const close = vi.fn();
    fixture.componentInstance.onSubmit({ close });
    expect(create).toHaveBeenCalledWith({
      description: 'Café',
      amount: 40,
      type: 'expense',
      category: 'Comida',
      date: '2026-10-30',
    });
    expect(close).toHaveBeenCalled();
  });
});
