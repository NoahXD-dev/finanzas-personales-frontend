const ISO_DATE_ONLY = /^(\d{4})-(\d{2})-(\d{2})$/;

/** API / GraphQL / BD */
export const ISO_DATE_FORMAT = 'yyyy-mm-dd';

/** Flowbite datepicker input display (locale + picker options) */
export const FLOWBITE_PICKER_FORMAT = 'mm/dd/yyyy';

export interface DateRange {
  from: string;
  to: string;
}

/** Parses YYYY-MM-DD as a local calendar date (no UTC shift). */
export function parseIsoDateLocal(iso: string): Date {
  const match = ISO_DATE_ONLY.exec(iso);
  if (!match) {
    return new Date(iso);
  }
  return new Date(Number(match[1]), Number(match[2]) - 1, Number(match[3]));
}

/** Calendar date as YYYY-MM-DD in local time (no UTC shift). */
export function toIsoDateLocal(date: Date): string {
  const year = date.getFullYear();
  const month = String(date.getMonth() + 1).padStart(2, '0');
  const day = String(date.getDate()).padStart(2, '0');
  return `${year}-${month}-${day}`;
}

/** First and last day of the current calendar month in local time. */
export function getCurrentMonthRange(): DateRange {
  const now = new Date();
  const start = new Date(now.getFullYear(), now.getMonth(), 1);
  const end = new Date(now.getFullYear(), now.getMonth() + 1, 0);
  return { from: toIsoDateLocal(start), to: toIsoDateLocal(end) };
}

export function isValidDateRange(from: string, to: string): boolean {
  return Boolean(from && to && from <= to);
}
