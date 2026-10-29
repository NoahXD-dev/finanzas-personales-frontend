import { Component, input } from '@angular/core';
import { Table, TableBody, TableHead } from 'flowbite-angular/table';

import { DataTableColumn } from './data-table-column.model';

@Component({
  selector: 'app-data-table',
  imports: [Table, TableHead, TableBody],
  templateUrl: './data-table.component.html',
})
export class DataTableComponent {
  readonly columns = input.required<DataTableColumn[]>();
  readonly data = input<unknown[]>([]);
  readonly loading = input(false);
  readonly emptyMessage = input('No hay registros.');
  readonly title = input<string | undefined>(undefined);

  protected cellValue(row: unknown, column: DataTableColumn): string {
    const record = row as Record<string, unknown>;
    const value = record[column.key];
    if (column.format) {
      return column.format(value, row);
    }
    if (value === null || value === undefined) {
      return '';
    }
    return String(value);
  }
}
