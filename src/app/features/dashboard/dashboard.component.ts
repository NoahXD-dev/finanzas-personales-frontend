import { Component, computed, inject, signal } from '@angular/core';
import { rxResource } from '@angular/core/rxjs-interop';

import { Movement } from '../movements/movement.model';
import { MovementsService } from '../movements/movements.service';
import { BarChartComponent } from '../../shared/bar-chart/bar-chart.component';
import { BarChartSeries } from '../../shared/bar-chart/bar-chart-series.model';
import { LineChartComponent } from '../../shared/line-chart/line-chart.component';
import {
  DateRange,
  getCurrentMonthRange,
  isValidDateRange,
} from '../../shared/date/date-range';
import { formatIsoDate } from '../../shared/date/format-iso-date';
import { DataTableColumn } from '../../shared/data-table/data-table-column.model';
import { DataTableComponent } from '../../shared/data-table/data-table.component';
import { FlowbiteDateRangeComponent } from '../../shared/date/flowbite-date-range.component';

@Component({
  selector: 'app-dashboard',
  imports: [
    BarChartComponent,
    LineChartComponent,
    DataTableComponent,
    FlowbiteDateRangeComponent,
  ],
  templateUrl: './dashboard.component.html',
})
export class DashboardComponent {
  private readonly movementsService = inject(MovementsService);

  private readonly initialRange = getCurrentMonthRange();

  protected readonly fromDate = signal(this.initialRange.from);
  protected readonly toDate = signal(this.initialRange.to);
  protected readonly dateRange = signal<DateRange>(this.initialRange);

  protected readonly dateRangeInvalid = computed(
    () => !isValidDateRange(this.fromDate(), this.toDate()),
  );

  protected readonly movementsResource = rxResource({
    params: () => this.dateRange(),
    stream: ({ params }) =>
      this.movementsService.findAll(params.from, params.to),
    defaultValue: [] as Movement[],
  });

  protected readonly movementsByMonthResource = rxResource({
    params: () => this.dateRange(),
    stream: ({ params }) =>
      this.movementsService.getMovementsByMonth(params.from, params.to),
    defaultValue: [] as {
      month: string;
      totalIncome: number;
      totalExpense: number;
    }[],
  });

  protected readonly movementsByCategoryResource = rxResource({
    params: () => this.dateRange(),
    stream: ({ params }) =>
      this.movementsService.getMovementsByCategory(params.from, params.to),
    defaultValue: [] as {
      category: string;
      totalIncome: number;
      totalExpense: number;
    }[],
  });

  protected readonly movementSummaryResource = rxResource({
    params: () => this.dateRange(),
    stream: ({ params }) =>
      this.movementsService.getMovementSummary(params.from, params.to),
    defaultValue: {
      totalIncome: 0,
      totalExpense: 0,
      balance: 0,
    } as { totalIncome: number; totalExpense: number; balance: number; },
  });

  protected readonly categoryChartCategories = computed(() =>
    this.movementsByCategoryResource.value().map((item) => item.category),
  );

  protected readonly categoryChartSeries = computed((): BarChartSeries[] => {
    const items = this.movementsByCategoryResource.value();
    return [
      { name: 'Ingresos', data: items.map((item) => item.totalIncome) },
      { name: 'Gastos', data: items.map((item) => item.totalExpense) },
    ];
  });

  private readonly currencyFormatter = new Intl.NumberFormat('es-MX', {
    style: 'currency',
    currency: 'MXN',
  });

  private readonly monthLabelFormatter = new Intl.DateTimeFormat('es-MX', {
    month: 'short',
    year: 'numeric',
  });

  protected readonly monthChartCategories = computed(() =>
    this.movementsByMonthResource.value().map((item) =>
      this.formatMonthLabel(item.month),
    ),
  );

  protected readonly monthChartSeries = computed((): BarChartSeries[] => {
    const items = this.movementsByMonthResource.value();
    return [
      { name: 'Ingresos', data: items.map((item) => item.totalIncome) },
      { name: 'Gastos', data: items.map((item) => item.totalExpense) },
    ];
  });

  protected readonly movementColumns: DataTableColumn[] = [
    { header: 'Descripción', key: 'description' },
    {
      header: 'Monto',
      key: 'amount',
      format: (value) => this.formatCurrency(Number(value)),
    },
    { header: 'Tipo', key: 'type' },
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
    this.commitDateRangeIfValid();
  }

  private commitDateRangeIfValid(): void {
    const from = this.fromDate();
    const to = this.toDate();
    if (isValidDateRange(from, to)) {
      this.dateRange.set({ from, to });
    }
  }

  protected formatCurrency(value: number): string {
    return this.currencyFormatter.format(value);
  }

  protected amountColorClass(value: number): string {
    if (value > 0) {
      return 'text-success';
    }
    if (value < 0) {
      return 'text-danger';
    }
    return 'text-heading';
  }

  private formatMonthLabel(month: string): string {
    const date = new Date(`${month}T12:00:00`);
    if (Number.isNaN(date.getTime())) {
      return month;
    }
    return this.monthLabelFormatter.format(date);
  }
}
