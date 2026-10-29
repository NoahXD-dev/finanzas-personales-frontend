const ISO_DATE_ONLY = /^(\d{4})-(\d{2})-(\d{2})$/;

const dateFormatter = new Intl.DateTimeFormat('es-MX', { dateStyle: 'medium' });

/**
 * Formats a date string for display. ISO date-only values (YYYY-MM-DD) are
 * interpreted as calendar dates in local time to avoid UTC timezone shifts.
 */
export function formatIsoDate(value: unknown): string {
  const raw = String(value);
  const match = ISO_DATE_ONLY.exec(raw);
  const date = match
    ? new Date(Number(match[1]), Number(match[2]) - 1, Number(match[3]))
    : new Date(raw);
  return dateFormatter.format(date);
}
