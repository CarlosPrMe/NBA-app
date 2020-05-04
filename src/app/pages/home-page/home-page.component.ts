import { Component, OnInit } from '@angular/core';
import { TeamService } from 'src/app/services/team.service';
import { strict } from 'assert';

@Component({
  selector: 'app-home-page',
  templateUrl: './home-page.component.html',
  styleUrls: ['./home-page.component.scss']
})
export class HomePageComponent implements OnInit {

  constructor(private teamService: TeamService) { }
  private dates: Array<string>;
  private datesToSend: string;
  public games: Array<any>;
  private today: Date;

  ngOnInit(): void {
    this.dates = [];
    this.today = new Date();
    this.dates = this._getLastDays(4, this.today);
    this.dates = this.dates.map(d => '&dates[]='.concat(d));
    this.datesToSend = this._convertToString(this.dates);
    this.teamService.getMatchYesterday(this.datesToSend).subscribe(res => {
      this.games = this._getLastResuts(res.data, this.dates);
    })
  }

  private _getLastDays(prevDays: number = 5, today: Date = new Date()): Array<string> {

    let days: Array<string> = [];
    let day: number = today.getDate();
    let month: number = today.getMonth() + 1;
    let year: number = today.getFullYear();
    let currentMonthPar: boolean = (month % 2) === 0 ? true : false;
    let isBisiesto: number = (year % 4) === 0 ? 29 : 28;
    let diff: number = prevDays - day;
    let diasRestantes: number = prevDays - diff;
    let resta: number = 0;
    let resta2: number = 0;

    for (let i = 0; i < prevDays; i++) {
      if (day >= prevDays) {
        
        days.push(`${year - 2}-${this._addZero(month)}-${this._addZero(day - i)}`);
      } else {

        if (diasRestantes) {
          days.push(`${year - 2}-${this._addZero(month)}-${this._addZero(day - resta)}`);
          diasRestantes--;
          resta++
        }
        else {
          if (month === 1) {
            days.push(`${year - 3}-${12}-${31 - resta2}`);
          }
          else if (currentMonthPar && month !== 2) {
            days.push(`${year - 2}-${this._addZero(month - 1 )}-${this._addZero(30 - resta2) }`);
          }
          else if (currentMonthPar && month === 2) {
            days.push(`${year - 2}-${this._addZero(month - 1 )}-${this._addZero(isBisiesto - resta2)}`);
          }
          else if (!currentMonthPar && month !== 1) {
            days.push(`${year - 2}-${this._addZero(month - 1 )}-${this._addZero(31 - resta2)}`);
          }
          resta2++;
        }
      }
    }

    return days;
  }

  private _convertToString(array: Array<string>): string {
    let string = '';
    array.forEach(element => {
      string = string.concat(element);
    })
    return string;
  }

  private _getLastResuts(data: Array<any>, days: Array<string>): Array<any> {
    let results: Array<any> = [];
    for (let i = 0; i < days.length; i++) {
      results = data.filter(m => m.date.split('T00:00:00.000Z')[0] === this.dates[i].split('&dates[]=')[1]);
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

}
