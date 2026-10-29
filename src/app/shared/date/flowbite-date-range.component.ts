import {
  afterNextRender,
  Component,
  DestroyRef,
  effect,
  ElementRef,
  inject,
  input,
  output,
  viewChild,
} from '@angular/core';
import { Datepicker } from 'flowbite';

import {
  DateRange,
  FLOWBITE_PICKER_FORMAT,
  ISO_DATE_FORMAT,
  isValidDateRange,
  parseIsoDateLocal,
  toIsoDateLocal,
} from './date-range';
import { registerFlowbiteDatepickerLocales } from './flowbite-datepicker-locale';

@Component({
  selector: 'app-flowbite-date-range',
  templateUrl: './flowbite-date-range.component.html',
})
export class FlowbiteDateRangeComponent {
  private readonly destroyRef = inject(DestroyRef);

  readonly from = input.required<string>();
  readonly to = input.required<string>();
  readonly rangeChange = output<DateRange>();

  private readonly host = viewChild<ElementRef<HTMLElement>>('host');

  private picker: Datepicker | null = null;
  private pickerReady = false;

  constructor() {
    afterNextRender(() => this.initPicker());

    effect(() => {
      const from = this.from();
      const to = this.to();
      if (!this.pickerReady || !this.picker) {
        return;
      }
      this.syncPickerFromInputs(from, to);
    });

    this.destroyRef.onDestroy(() => {
      this.picker?.destroyAndRemoveInstance();
      this.picker = null;
      this.pickerReady = false;
    });
  }

  private initPicker(): void {
    const hostEl = this.host()?.nativeElement;
    if (!hostEl || this.picker) {
      return;
    }

    registerFlowbiteDatepickerLocales();

    this.picker = new Datepicker(hostEl, {
      rangePicker: true,
      format: FLOWBITE_PICKER_FORMAT,
      language: 'es',
      autohide: true,
    });

    const from = this.from();
    const to = this.to();
    if (isValidDateRange(from, to)) {
      this.writeRangeToPicker(from, to);
    }

    const onChangeDate = (): void => {
      this.emitRangeFromPicker();
    };
    for (const input of hostEl.querySelectorAll('input')) {
      input.addEventListener('changeDate', onChangeDate);
      this.destroyRef.onDestroy(() => {
        input.removeEventListener('changeDate', onChangeDate);
      });
    }

    this.pickerReady = true;
  }

  private syncPickerFromInputs(from: string, to: string): void {
    if (!this.picker || !isValidDateRange(from, to)) {
      return;
    }

    const [currentFrom, currentTo] = this.readIsoRangeFromPicker();
    if (currentFrom === from && currentTo === to) {
      return;
    }

    this.writeRangeToPicker(from, to);
  }

  private emitRangeFromPicker(): void {
    const [from, to] = this.readIsoRangeFromPicker();
    if (from && to && isValidDateRange(from, to)) {
      this.rangeChange.emit({ from, to });
    }
  }

  private writeRangeToPicker(from: string, to: string): void {
    const range = this.picker!.getDatepickerInstance() as unknown as {
      setDates(rangeStart: Date, rangeEnd: Date): void;
    };
    range.setDates(parseIsoDateLocal(from), parseIsoDateLocal(to));
  }

  private readIsoRangeFromPicker(): [string | undefined, string | undefined] {
    if (!this.picker) {
      return [undefined, undefined];
    }

    const raw = this.picker.getDate();
    if (Array.isArray(raw) && raw.length >= 2) {
      const [start, end] = raw as unknown[];
      if (start instanceof Date && end instanceof Date) {
        const from = toIsoDateLocal(start);
        const to = toIsoDateLocal(end);
        if (isValidDateRange(from, to)) {
          return [from, to];
        }
      }
    }

    const instance = this.picker.getDatepickerInstance() as unknown as {
      getDates(format?: string): (string | undefined)[];
    };
    const dates = instance.getDates(ISO_DATE_FORMAT);
    return [dates[0], dates[1]];
  }
}
