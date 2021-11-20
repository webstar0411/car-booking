import {Pipe, PipeTransform} from '@angular/core';

@Pipe({
  name: 'dateToTimepicker'
})
export class DateToTimepickerPipe implements PipeTransform {

  transform(value: string, ...args: any[]): string {
    try {
      const date = new Date(value);
      return `${date.getHours()}:${date.getMinutes()}`;
    } catch (e) {
      return '00:00';
    }
  }

}
