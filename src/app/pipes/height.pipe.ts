import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'height'
})
export class HeightPipe implements PipeTransform {

  private feet:number = 3.28084 ;
  transform(value: number, ...args: unknown[]): string {

    let height:number = value / this.feet; 
    return height.toFixed(2);
  }

}
