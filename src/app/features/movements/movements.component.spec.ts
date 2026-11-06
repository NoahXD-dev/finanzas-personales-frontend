import { TestBed } from '@angular/core/testing';
import { of } from 'rxjs';

import { getCurrentMonthRange } from '../../shared/date/date-range';
import { MovementsComponent } from './movements.component';
import { MovementsService } from './movements.service';

describe('MovementsComponent', () => {
  const findAll = vi.fn(() => of([]));
  const create = vi.fn();
  const getMovementsByCategory = vi.fn(() =>
    of([] as { category: string; totalIncome: number; totalExpense: number }[]),
  );

  beforeEach(async () => {
    findAll.mockClear();
    create.mockReset();
    getMovementsByCategory.mockClear();
    getMovementsByCategory.mockReturnValue(of([]));
    await TestBed.configureTestingModule({
      imports: [MovementsComponent],
      providers: [
        {
          provide: MovementsService,
          useValue: { findAll, create, getMovementsByCategory },
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
    expect(findAll).toHaveBeenCalledWith({
      fromDate: range.from,
      toDate: range.to,
    }, true);
    expect(compiled.textContent).toContain('Nuevo movimiento');
    expect(compiled.textContent).toContain('No hay movimientos en este periodo.');
  });

  it('reloads when type and category change', async () => {
    getMovementsByCategory.mockReturnValue(
      of([{ category: 'Comida', totalIncome: 0, totalExpense: 40 }]),
    );
    const fixture = TestBed.createComponent(MovementsComponent);
    await fixture.whenStable();
    fixture.detectChanges();

    const type = fixture.nativeElement.querySelector(
      '#movement-filter-type',
    ) as HTMLSelectElement;
    type.value = 'expense';
    type.dispatchEvent(new Event('change'));
    await fixture.whenStable();
    fixture.detectChanges();

    const category = fixture.nativeElement.querySelector(
      '#movement-filter-category',
    ) as HTMLSelectElement;
    category.value = 'Comida';
    category.dispatchEvent(new Event('change'));
    await fixture.whenStable();
    fixture.detectChanges();

    const range = getCurrentMonthRange();
    expect(findAll).toHaveBeenCalledWith({
      fromDate: range.from,
      toDate: range.to,
      type: 'expense',
      category: 'Comida',
    }, true);
    expect(fixture.nativeElement.textContent).toContain('Limpiar');

    const clear = [...fixture.nativeElement.querySelectorAll('button')].find(
      (button: HTMLButtonElement) => button.textContent?.includes('Limpiar'),
    );
    clear?.click();
    await fixture.whenStable();
    fixture.detectChanges();

    expect(findAll).toHaveBeenLastCalledWith({
      fromDate: range.from,
      toDate: range.to,
    }, true);
    expect(fixture.nativeElement.textContent).not.toContain('Limpiar');
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
      items: [],
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

  it('sends the item breakdown and trims each field', async () => {
    create.mockReturnValue(
      of({
        id: '1',
        description: 'Super',
        amount: 40,
        type: 'expense',
        category: 'Comida',
        date: '2026-11-06',
        items: [],
      }),
    );
    const fixture = TestBed.createComponent(MovementsComponent);
    await fixture.whenStable();
    fixture.detectChanges();
    const component = fixture.componentInstance;
    component.addItem();
    component.addItem();
    component.form.controls.items.at(0).setValue({
      name: '  Leche ',
      subcategory: ' Lácteos ',
      price: 25,
    });
    component.form.controls.items.at(1).setValue({
      name: 'Pan',
      subcategory: 'Panadería',
      price: 10,
    });
    component.form.patchValue({
      description: 'Super',
      amount: 40,
      type: 'expense',
      category: 'Comida',
      date: '2026-11-06',
    });
    const close = vi.fn();
    component.onSubmit({ close });
    expect(create).toHaveBeenCalledWith({
      description: 'Super',
      amount: 40,
      type: 'expense',
      category: 'Comida',
      date: '2026-11-06',
      items: [
        { name: 'Leche', price: 25, subcategory: 'Lácteos' },
        { name: 'Pan', price: 10, subcategory: 'Panadería' },
      ],
    });
    expect(close).toHaveBeenCalled();
  });

  it('does not create when item prices exceed the amount', async () => {
    const fixture = TestBed.createComponent(MovementsComponent);
    await fixture.whenStable();
    fixture.detectChanges();
    const component = fixture.componentInstance;
    component.addItem();
    component.form.controls.items.at(0).setValue({
      name: 'Leche',
      subcategory: 'Lácteos',
      price: 50,
    });
    component.form.patchValue({
      description: 'Super',
      amount: 40,
      type: 'expense',
      category: 'Comida',
      date: '2026-11-06',
    });
    component.onSubmit({ close: vi.fn() });
    expect(create).not.toHaveBeenCalled();
    expect(component.form.hasError('itemsExceedAmount')).toBe(true);
  });
});
