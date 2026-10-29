import { Datepicker } from 'flowbite-datepicker';

import { FLOWBITE_PICKER_FORMAT } from './date-range';

let registered = false;

export function registerFlowbiteDatepickerLocales(): void {
  if (registered) {
    return;
  }

  Datepicker.locales['es'] = {
    days: [
      'Domingo',
      'Lunes',
      'Martes',
      'Miércoles',
      'Jueves',
      'Viernes',
      'Sábado',
    ],
    daysShort: ['Dom', 'Lun', 'Mar', 'Mié', 'Jue', 'Vie', 'Sáb'],
    daysMin: ['Do', 'Lu', 'Ma', 'Mi', 'Ju', 'Vi', 'Sa'],
    months: [
      'Enero',
      'Febrero',
      'Marzo',
      'Abril',
      'Mayo',
      'Junio',
      'Julio',
      'Agosto',
      'Septiembre',
      'Octubre',
      'Noviembre',
      'Diciembre',
    ],
    monthsShort: [
      'Ene',
      'Feb',
      'Mar',
      'Abr',
      'May',
      'Jun',
      'Jul',
      'Ago',
      'Sep',
      'Oct',
      'Nov',
      'Dic',
    ],
    today: 'Hoy',
    monthsTitle: 'Meses',
    clear: 'Borrar',
    weekStart: 1,
    format: FLOWBITE_PICKER_FORMAT,
  };

  registered = true;
}
