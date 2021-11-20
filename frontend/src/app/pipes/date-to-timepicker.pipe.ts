import {Pipe, PipeTransform} from '@angular/core';

@Pipe({
  name: 'dateToTimepicker'
})
export class DateToTimepickerPipe implements PipeTransform {

  transform(value: string, ...args: any[]): string {
    if (value === null) {
      return '00:00';
    }
    const date = new Date(value);
    return `${date.getHours()}:${date.getMinutes()}`;
  }

}
