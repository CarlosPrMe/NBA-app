import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'date'
})
export class DatePipe implements PipeTransform {

  transform(value: string, ...args: unknown[]): string {

    let date = value.split('T00:00:00.000Z')[0];
    return date;
  }
}
