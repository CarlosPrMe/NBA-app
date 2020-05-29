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
    this._teamService.getMatchYesterday(this.datesToSend).subscribe(res => {
      this.games = this._datesService.getLastResuts(res.data, this.dates);
    })
  }

}
