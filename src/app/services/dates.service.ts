import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})

export class DatesService {

  public getLastDays(prevDays: number = 5, today: Date = new Date()): Array<string> {
    let days: Array<string> = [];
    let day: number = today.getDate();
    let month: number = today.getMonth() + 1;
    let year: number = today.getFullYear();
    let currentMonthPar: boolean = (month % 2) === 0 ? true : false;
    let isLeapYear: number = (year % 4) === 0 ? 29 : 28;
    let diff: number = prevDays - day;
    let remainingDays: number = prevDays - diff;
    let subtraction: number = 0;
    let subtractionAdditional: number = 0;

    for (let i = 0; i < prevDays; i++) {
      if (day >= prevDays) {

        days.push(`${year - 2}-${this._addZero(month)}-${this._addZero(day - i)}`);
      } else {

        if (remainingDays) {
          days.push(`${year - 2}-${this._addZero(month)}-${this._addZero(day - subtraction)}`);
          remainingDays--;
          subtraction++;
        }
        else {
          if (month === 1) {
            days.push(`${year - 3}-${12}-${31 - subtractionAdditional}`);
          }
          else if (currentMonthPar && month !== 2) {
            days.push(`${year - 2}-${this._addZero(month - 1)}-${this._addZero(30 - subtractionAdditional)}`);
          }
          else if (currentMonthPar && month === 2) {
            days.push(`${year - 2}-${this._addZero(month - 1)}-${this._addZero(isLeapYear - subtractionAdditional)}`);
          }
          else if (!currentMonthPar && month !== 1) {
            days.push(`${year - 2}-${this._addZero(month - 1)}-${this._addZero(31 - subtractionAdditional)}`);
          }
          subtractionAdditional++;
        }
      }
    }

    return days;
  }

  public convertToString(array: Array<string>): string {
    let string = '';
    array.forEach(element => {
      string = string.concat(element);
    })
    return string;
  }

  public getLastResuts(data: Array<any>, days: Array<string>): Array<any> {
    let results: Array<any> = [];
    for (let i = 0; i < days.length; i++) {
      results = data.filter(m => m.date.split('T00:00:00.000Z')[0] === days[i].split('&dates[]=')[1]);
      results.length > 0 ? results : null;
      if (results.length > 0) {
        return results;
      }
    }
  }

  private _addZero(operation): string {
    let str = '0';
    if (operation < 10) {
      return str.concat(operation);
    }
    return operation;
  }

  public getCurrentYear() {
    return new Date().getFullYear() - 2;
  }
}
