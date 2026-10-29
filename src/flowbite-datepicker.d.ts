declare module 'flowbite-datepicker' {
  export class Datepicker {
    static locales: Record<string, Record<string, unknown>>;
    constructor(element: HTMLElement, options?: unknown);
    destroy(): void;
    show(): void;
    hide(): void;
    setDate(date: string): void;
    getDate(): string;
  }

  export class DateRangePicker {
    constructor(element: HTMLElement, options?: unknown);
    destroy(): void;
    setDates(dates: string[]): void;
    getDates(format?: string): string[];
  }
}
