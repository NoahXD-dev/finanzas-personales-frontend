export interface DataTableColumn {
  header: string;
  key: string;
  format?: (value: unknown, row: unknown) => string;
}
