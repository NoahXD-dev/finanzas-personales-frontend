import { Component, computed, effect, inject, signal } from '@angular/core';
import {
  AbstractControl,
  FormArray,
  FormBuilder,
  FormControl as NgFormControl,
  FormGroup,
  ReactiveFormsModule,
  ValidationErrors,
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

interface ItemForm {
  name: NgFormControl<string>;
  subcategory: NgFormControl<string>;
  price: NgFormControl<number | null>;
}

function toCents(value: unknown): number | undefined {
  if (typeof value !== 'number' || !Number.isFinite(value)) {
    return undefined;
  }
  return Math.round(value * 100);
}

function itemsWithinAmount(control: AbstractControl): ValidationErrors | null {
  const amountCents = toCents(control.get('amount')?.value);
  const items = control.get('items');
  if (
    amountCents === undefined ||
    !(items instanceof FormArray) ||
    items.length === 0
  ) {
    return null;
  }
  let total = 0;
  for (const group of items.controls) {
    const cents = toCents(group.get('price')?.value);
    if (cents === undefined || cents <= 0) {
      return null;
    }
    total += cents;
  }
  return total > amountCents ? { itemsExceedAmount: true } : null;
}

function movementErrorMessage(message: string): string {
  if (message.includes('Item total exceeds movement amount')) {
    return 'La suma de los ítems supera el monto.';
  }
  if (message.includes('Item price must be greater than zero')) {
    return 'El precio de cada ítem debe ser mayor que cero.';
  }
  if (message.includes('Item name is required')) {
    return 'El nombre del ítem es obligatorio.';
  }
  if (message.includes('Item name is too long')) {
    return 'El nombre del ítem admite hasta 200 caracteres.';
  }
  if (message.includes('Item subcategory is required')) {
    return 'La subcategoría es obligatoria.';
  }
  if (message.includes('Item subcategory is too long')) {
    return 'La subcategoría admite hasta 200 caracteres.';
  }
  return message;
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
    items: this.fb.array<FormGroup<ItemForm>>([]),
  }, { validators: itemsWithinAmount });

  protected readonly movementsResource = rxResource({
    params: () => ({
      filter: this.listFilter(),
      version: this.listVersion(),
    }),
    stream: ({ params }) =>
      this.movementsService.findAll(params.filter, true).pipe(
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
      header: 'Desglose',
      key: 'items',
      preserveLines: true,
      format: (_value, row) => this.formatItems(row as Movement),
    },
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
    if (raw.amount === null || raw.items.some((item) => item.price === null)) {
      return;
    }

    const items = raw.items.map((item) => ({
      name: item.name.trim(),
      price: item.price as number,
      subcategory: item.subcategory.trim(),
    }));

    this.submitting.set(true);
    this.movementsService
      .create({
        description: raw.description.trim(),
        amount: raw.amount,
        type: raw.type,
        category: raw.category.trim(),
        date: raw.date,
        ...(items.length > 0 ? { items } : {}),
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
            this.errorMessage.set(movementErrorMessage(error.message));
            return;
          }
          this.errorMessage.set(
            'No se pudo guardar el movimiento. Inténtalo de nuevo.',
          );
        },
      });
  }

  addItem(): void {
    this.form.controls.items.push(this.createItemGroup());
  }

  protected removeItem(index: number): void {
    this.form.controls.items.removeAt(index);
  }

  protected unallocatedAmount(): number | null {
    if (this.form.hasError('itemsExceedAmount')) {
      return null;
    }
    const amountCents = toCents(this.form.controls.amount.value);
    const items = this.form.controls.items;
    if (amountCents === undefined || items.length === 0) {
      return null;
    }
    let total = 0;
    for (const group of items.controls) {
      const cents = toCents(group.controls.price.value);
      if (cents === undefined || cents <= 0) {
        return null;
      }
      total += cents;
    }
    return (amountCents - total) / 100;
  }

  protected formatCurrency(amount: number): string {
    return this.currencyFormatter.format(amount);
  }

  protected resetForm(): void {
    this.errorMessage.set(null);
    this.form.controls.items.clear();
    this.form.reset({
      description: '',
      amount: null,
      type: 'expense',
      category: '',
      date: toIsoDateLocal(new Date()),
    });
  }

  private createItemGroup(): FormGroup<ItemForm> {
    return this.fb.group({
      name: this.fb.nonNullable.control('', [
        Validators.required,
        Validators.pattern(/\S/),
        Validators.maxLength(200),
      ]),
      subcategory: this.fb.nonNullable.control('', [
        Validators.required,
        Validators.pattern(/\S/),
        Validators.maxLength(200),
      ]),
      price: this.fb.control<number | null>(null, [
        Validators.required,
        Validators.min(0.01),
      ]),
    });
  }

  private formatItems(movement: Movement): string {
    const items = [...(movement.items ?? [])].sort(
      (a, b) => a.position - b.position,
    );
    if (items.length === 0) {
      return '—';
    }
    const lines = items.map(
      (item) =>
        `${item.name} · ${item.subcategory} · ${this.currencyFormatter.format(item.price)}`,
    );
    const totalCents = items.reduce(
      (sum, item) => sum + (toCents(item.price) ?? 0),
      0,
    );
    const amountCents = toCents(movement.amount);
    if (amountCents !== undefined && amountCents > totalCents) {
      lines.push(
        `Sin desglose ${this.currencyFormatter.format((amountCents - totalCents) / 100)}`,
      );
    }
    return lines.join('\n');
  }

  private formatAmount(amount: number, movement: Movement): string {
    const formatted = this.currencyFormatter.format(Math.abs(amount));
    return movement.type === 'expense' ? `-${formatted}` : `+${formatted}`;
  }
}
