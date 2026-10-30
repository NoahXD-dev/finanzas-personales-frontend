import { Component, inject, signal } from '@angular/core';
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
import { getCurrentMonthRange, toIsoDateLocal } from '../../shared/date/date-range';
import { FlowbiteDateComponent } from '../../shared/date/flowbite-date.component';
import { formatIsoDate } from '../../shared/date/format-iso-date';
import { Movement, MovementType } from './movement.model';
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
  ],
  templateUrl: './movements.component.html',
})
export class MovementsComponent {
  private readonly fb = inject(FormBuilder);
  private readonly movementsService = inject(MovementsService);
  private readonly monthRange = getCurrentMonthRange();
  private readonly listVersion = signal(0);

  private readonly currencyFormatter = new Intl.NumberFormat('es-MX', {
    style: 'currency',
    currency: 'MXN',
  });

  private readonly monthFormatter = new Intl.DateTimeFormat('es-MX', {
    month: 'long',
    year: 'numeric',
  });

  protected readonly monthLabel = this.capitalize(
    this.monthFormatter.format(
      new Date(
        Number(this.monthRange.from.slice(0, 4)),
        Number(this.monthRange.from.slice(5, 7)) - 1,
        1,
      ),
    ),
  );

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
    params: () => this.listVersion(),
    stream: () =>
      this.movementsService.findAll(this.monthRange.from, this.monthRange.to).pipe(
        map((rows) => [...rows].sort((a, b) => b.date.localeCompare(a.date))),
      ),
    defaultValue: [] as Movement[],
  });

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

  private capitalize(value: string): string {
    if (value.length === 0) {
      return value;
    }
    return value.charAt(0).toUpperCase() + value.slice(1);
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
