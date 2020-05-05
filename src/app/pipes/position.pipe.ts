import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'position'
})
export class PositionPipe implements PipeTransform {

  private positions: Array<string> = ['base/ escolta', 'alero', 'pivot / ala-pivot'];
  private positionsFromAPI: Array<string> = ['G', 'F', 'C'];
  transform(value: string, ...args: unknown[]): string {
    let string;
    let positions = value.split('-');
    let parsed = this._parsePositions(positions, this.positions, this.positionsFromAPI);
    parsed.length > 1 ? string = parsed.join(', ') : string = parsed[0];
    return string;
  }

  private _parsePositions(playerPosition, typePositions: Array<string>, originalPositons: Array<string>): Array<string> {

    let parsedPositions = [];
    playerPosition.forEach(p => {
      let found = originalPositons.findIndex(u => u === p);
      found > -1 ? parsedPositions.push(typePositions[found]) : null;
    });
    return parsedPositions;
  }
}
