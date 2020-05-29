import { Component, OnInit, Input, OnChanges, SimpleChanges } from '@angular/core';
import { TeamService } from 'src/app/services/team.service';
import { StatsModel } from 'src/app/models/stats.model';
import { GameModel } from 'src/app/models/game.model';

@Component({
  selector: 'app-result-box',
  templateUrl: './result-box.component.html',
  styleUrls: ['./result-box.component.scss']
})
export class ResultBoxComponent implements OnInit, OnChanges {

  @Input() games: Array<GameModel>
  public gameSelected: GameModel;
  public idStatsDetails: number;
  public statsDetailsData: Array<StatsModel>;
  public pageStats: boolean;

  constructor(private _teamService: TeamService) { }

  ngOnInit(): void { }
  ngOnChanges(change: SimpleChanges) {
    this.games = change.games.currentValue;
    this.pageStats = false;
  }

  public onShowStatsEvent(event) {
    this._teamService.getStatsById(event[0]).subscribe(res => {
      this.statsDetailsData = res.data;
      this.idStatsDetails = event[0];
      this.gameSelected = event[1];
    })
  }
}
