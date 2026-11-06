import { Component, computed, effect, inject, signal } from '@angular/core';
import {
  FormBuilder,
  ReactiveFormsModule,
  Validators,
} from '@angular/forms';
import { rxResource } from '@angular/core/rxjs-interop';
import { Button } from 'flowbite-angular/button';
import { FormControl, FormField, Label } from 'flowbite-angular/form';
import {
  Modal,
  ModalContent,
  ModalFooter,
  ModalHeader,
  ModalOverlay,
} from 'flowbite-angular/modal';
import { NgpDialogTrigger } from 'ng-primitives/dialog';
import { map } from 'rxjs';

import { GraphqlClientError } from '../../core/graphql/graphql.error';
import { DataTableColumn } from '../../shared/data-table/data-table-column.model';
import { DataTableComponent } from '../../shared/data-table/data-table.component';
import {
  DateRange,
  getCurrentMonthRange,
  isValidDateRange,
  toIsoDateLocal,
} from '../../shared/date/date-range';
import { FlowbiteDateComponent } from '../../shared/date/flowbite-date.component';
import { FlowbiteDateRangeComponent } from '../../shared/date/flowbite-date-range.component';
import { formatIsoDate } from '../../shared/date/format-iso-date';
import { Movement, MovementFilter, MovementType } from './movement.model';
import { MovementsService } from './movements.service';

interface DialogClose {
  close: () => void;
}

@Component({
  selector: 'app-movements',
  imports: [
    ReactiveFormsModule,
    Button,
    FormField,
    Label,
    FormControl,
    Modal,
    ModalOverlay,
    ModalHeader,
    ModalContent,
    ModalFooter,
    NgpDialogTrigger,
    DataTableComponent,
    FlowbiteDateComponent,
    FlowbiteDateRangeComponent,
  ],
  templateUrl: './movements.component.html',
})
export class MovementsComponent {
  private readonly fb = inject(FormBuilder);
  private readonly movementsService = inject(MovementsService);
  private readonly initialRange = getCurrentMonthRange();
  private readonly listVersion = signal(0);

  private readonly currencyFormatter = new Intl.NumberFormat('es-MX', {
    style: 'currency',
    currency: 'MXN',
  });

  protected readonly fromDate = signal(this.initialRange.from);
  protected readonly toDate = signal(this.initialRange.to);
  protected readonly dateRange = signal<DateRange>(this.initialRange);
  protected readonly typeFilter = signal<'' | MovementType>('');
  protected readonly categoryFilter = signal('');

  protected readonly dateRangeInvalid = computed(
    () => !isValidDateRange(this.fromDate(), this.toDate()),
  );

  protected readonly periodLabel = computed(() => {
    const range = this.dateRange();
    return `${formatIsoDate(range.from)} – ${formatIsoDate(range.to)}`;
  });

  protected readonly filtersDirty = computed(() => {
    const range = this.dateRange();
    return (
      range.from !== this.initialRange.from ||
      range.to !== this.initialRange.to ||
      this.typeFilter() !== '' ||
      this.categoryFilter() !== ''
    );
  });

  private readonly listFilter = computed((): MovementFilter => {
    const range = this.dateRange();
    const type = this.typeFilter();
    const category = this.categoryFilter().trim();
    return {
      fromDate: range.from,
      toDate: range.to,
      ...(type ? { type } : {}),
      ...(category ? { category } : {}),
    };
  });

  protected readonly submitting = signal(false);
  protected readonly errorMessage = signal<string | null>(null);

  readonly form = this.fb.group({
    description: this.fb.nonNullable.control('', [
      Validators.required,
      Validators.pattern(/\S/),
    ]),
    amount: this.fb.control<number | null>(null, [
      Validators.required,
      Validators.min(0.01),
    ]),
    type: this.fb.nonNullable.control<MovementType>('expense', Validators.required),
    category: this.fb.nonNullable.control('', [
      Validators.required,
      Validators.pattern(/\S/),
    ]),
    date: this.fb.nonNullable.control(toIsoDateLocal(new Date()), Validators.required),
  });

  protected readonly movementsResource = rxResource({
    params: () => ({
      filter: this.listFilter(),
      version: this.listVersion(),
    }),
    stream: ({ params }) =>
      this.movementsService.findAll(params.filter).pipe(
        map((rows) => [...rows].sort((a, b) => b.date.localeCompare(a.date))),
      ),
    defaultValue: [] as Movement[],
  });

  protected readonly categoriesResource = rxResource({
    params: () => ({
      from: this.dateRange().from,
      to: this.dateRange().to,
      version: this.listVersion(),
    }),
    stream: ({ params }) =>
      this.movementsService.getMovementsByCategory(params.from, params.to),
    defaultValue: [] as {
      category: string;
      totalIncome: number;
      totalExpense: number;
    }[],
  });

  protected readonly categoryOptions = computed(() => {
    const names = this.categoriesResource
      .value()
      .map((item) => item.category.trim())
      .filter((category) => category.length > 0);
    return [...new Set(names)].sort((a, b) => a.localeCompare(b, 'es'));
  });

  protected readonly emptyMessage = computed(() => {
    if (this.typeFilter() || this.categoryFilter()) {
      return 'No hay movimientos con estos filtros.';
    }
    return 'No hay movimientos en este periodo.';
  });

  constructor() {
    effect(() => {
      const selected = this.categoryFilter();
      if (
        !selected ||
        this.categoriesResource.isLoading() ||
        this.categoriesResource.error()
      ) {
        return;
      }
      if (!this.categoryOptions().includes(selected)) {
        this.categoryFilter.set('');
      }
    });
  }

  protected readonly columns: DataTableColumn[] = [
    { header: 'Descripción', key: 'description' },
    {
      header: 'Monto',
      key: 'amount',
      format: (value, row) => this.formatAmount(Number(value), row as Movement),
    },
    {
      header: 'Tipo',
      key: 'type',
      format: (value) => this.typeLabel(String(value)),
    },
    { header: 'Categoría', key: 'category' },
    {
      header: 'Fecha',
      key: 'date',
      format: (value) => formatIsoDate(value),
    },
  ];

  protected onDateRangeChange(range: DateRange): void {
    this.fromDate.set(range.from);
    this.toDate.set(range.to);
    if (isValidDateRange(range.from, range.to)) {
      this.dateRange.set(range);
    }
  }

  protected onTypeFilterChange(event: Event): void {
    const value = (event.target as HTMLSelectElement).value;
    if (value === 'income' || value === 'expense') {
      this.typeFilter.set(value);
      return;
    }
    this.typeFilter.set('');
  }

  protected onCategoryFilterChange(event: Event): void {
    this.categoryFilter.set((event.target as HTMLSelectElement).value);
  }

  protected resetFilters(): void {
    this.fromDate.set(this.initialRange.from);
    this.toDate.set(this.initialRange.to);
    this.dateRange.set({ ...this.initialRange });
    this.typeFilter.set('');
    this.categoryFilter.set('');
  }

  protected typeLabel(type: string): string {
    if (type === 'income') {
      return 'Ingreso';
    }
    if (type === 'expense') {
      return 'Gasto';
    }
    return type;
  }

  onSubmit(dialog: DialogClose): void {
    this.errorMessage.set(null);
    if (this.form.invalid) {
      this.form.markAllAsTouched();
      return;
    }

    const raw = this.form.getRawValue();
    if (raw.amount === null) {
      return;
    }

    this.submitting.set(true);
    this.movementsService
      .create({
        description: raw.description.trim(),
        amount: raw.amount,
        type: raw.type,
        category: raw.category.trim(),
        date: raw.date,
      })
      .subscribe({
        next: () => {
          this.submitting.set(false);
          this.resetForm();
          this.listVersion.update((version) => version + 1);
          dialog.close();
        },
        error: (error: unknown) => {
          this.submitting.set(false);
          if (error instanceof GraphqlClientError) {
            this.errorMessage.set(error.message);
            return;
          }
          this.errorMessage.set(
            'No se pudo guardar el movimiento. Inténtalo de nuevo.',
          );
        },
      });
  }

  protected resetForm(): void {
    this.errorMessage.set(null);
    this.form.reset({
      description: '',
      amount: null,
      type: 'expense',
      category: '',
      date: toIsoDateLocal(new Date()),
    });
  }

  private formatAmount(amount: number, movement: Movement): string {
    const formatted = this.currencyFormatter.format(Math.abs(amount));
    return movement.type === 'expense' ? `-${formatted}` : `+${formatted}`;
  }
}
