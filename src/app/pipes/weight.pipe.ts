import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'weight'
})
export class WeightPipe implements PipeTransform {

  private pound: number = 0.453592;

  transform(value: number, ...args: unknown[]): number {
    let number: number = Math.floor(value * this.pound);
    return number ;
  }

}