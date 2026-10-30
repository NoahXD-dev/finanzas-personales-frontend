import {
  afterNextRender,
  Component,
  DestroyRef,
  ElementRef,
  forwardRef,
  inject,
  input,
  viewChild,
} from '@angular/core';
import { ControlValueAccessor, NG_VALUE_ACCESSOR } from '@angular/forms';
import { Datepicker } from 'flowbite-datepicker';

import {
  FLOWBITE_PICKER_FORMAT,
  ISO_DATE_FORMAT,
  parseIsoDateLocal,
} from './date-range';
import { registerFlowbiteDatepickerLocales } from './flowbite-datepicker-locale';

@Component({
  selector: 'app-flowbite-date',
  templateUrl: './flowbite-date.component.html',
  providers: [
    {
      provide: NG_VALUE_ACCESSOR,
      useExisting: forwardRef(() => FlowbiteDateComponent),
      multi: true,
    },
  ],
})
export class FlowbiteDateComponent implements ControlValueAccessor {
  private readonly destroyRef = inject(DestroyRef);

  readonly inputId = input.required<string>();

  private readonly inputRef = viewChild<ElementRef<HTMLInputElement>>('input');

  private picker: Datepicker | null = null;
  private pending = '';
  private onChange: (value: string) => void = () => {};
  private onTouched: () => void = () => {};

  constructor() {
    afterNextRender(() => this.initPicker());
    this.destroyRef.onDestroy(() => {
      this.picker?.destroy();
      this.picker = null;
    });
  }

  writeValue(value: string | null): void {
    this.pending = value ?? '';
    this.applyPending();
  }

  registerOnChange(fn: (value: string) => void): void {
    this.onChange = fn;
  }

  registerOnTouched(fn: () => void): void {
    this.onTouched = fn;
  }

  setDisabledState(isDisabled: boolean): void {
    const input = this.inputRef()?.nativeElement;
    if (input) {
      input.disabled = isDisabled;
    }
  }

  protected touch(): void {
    this.onTouched();
    if (this.inputRef()?.nativeElement.value.trim() === '') {
      this.publish('');
    }
  }

  private initPicker(): void {
    const input = this.inputRef()?.nativeElement;
    if (!input || this.picker) {
      return;
    }

    registerFlowbiteDatepickerLocales();
    this.picker = new Datepicker(input, {
      autohide: true,
      format: FLOWBITE_PICKER_FORMAT,
      language: 'es',
      orientation: 'top',
      container: `#${this.inputId()}-field`,
    });
    this.applyPending();

    const onChangeDate = (): void => {
      this.publish(this.readIso());
    };
    input.addEventListener('changeDate', onChangeDate);
    this.destroyRef.onDestroy(() => {
      input.removeEventListener('changeDate', onChangeDate);
    });
  }

  private applyPending(): void {
    const input = this.inputRef()?.nativeElement;
    if (!this.picker || !input) {
      return;
    }
    if (!this.pending) {
      input.value = '';
      return;
    }
    (this.picker as unknown as { setDate(date: Date): void }).setDate(
      parseIsoDateLocal(this.pending),
    );
  }

  private publish(iso: string): void {
    if (iso === this.pending) {
      return;
    }
    this.pending = iso;
    this.onChange(iso);
  }

  private readIso(): string {
    const formatted = (
      this.picker as { getDate(format?: string): string | undefined } | null
    )?.getDate(ISO_DATE_FORMAT);
    if (typeof formatted === 'string' && /^\d{4}-\d{2}-\d{2}$/.test(formatted)) {
      return formatted;
    }
    return '';
  }
}
