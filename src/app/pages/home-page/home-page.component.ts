import { Component, OnInit } from '@angular/core';
import { TeamService } from 'src/app/services/team.service';
import { DatesService } from 'src/app/services/dates.service';
import { GameModel } from 'src/app/models/game.model';

@Component({
  selector: 'app-home-page',
  templateUrl: './home-page.component.html',
  styleUrls: ['./home-page.component.scss']
})
export class HomePageComponent implements OnInit {

  constructor(private _teamService: TeamService, private _datesService: DatesService) { }
  private dates: Array<string>;
  private datesToSend: string;
  public games: Array<GameModel>;
  private today: Date;

  ngOnInit(): void {
    this.dates = [];
    this.dates = this._datesService.getLastDays()
    this.dates = this.dates.map(d => '&dates[]='.concat(d));
    this.datesToSend = this._datesService.convertToString(this.dates);
    this.dates = ["&dates[]=2018-04-18" // Eliminar cuando se deje de hacer pruebas
      , "&dates[]=2018-04-17" // Eliminar cuando se deje de hacer pruebas
      , "&dates[]=2018-04-16" // Eliminar cuando se deje de hacer pruebas
      , "&dates[]=2018-04-15" // Eliminar cuando se deje de hacer pruebas
      , "&dates[]=2018-04-14"]; // Eliminar cuando se deje de hacer pruebas
    this.datesToSend = '&dates[]=2018-04-18&dates[]=2018-04-17&dates[]=2018-04-16&dates[]=2018-04-15&dates[]=2018-04-14'; // Eliminar cuando se deje de hacer pruebas
    this._teamService.getMatchYesterday(this.datesToSend).subscribe(res => {
      this.games = this._datesService.getLastResuts(res.data, this.dates);
    })
  }

}
