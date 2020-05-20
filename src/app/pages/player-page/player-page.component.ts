import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { PlayerModel } from 'src/app/models/player.model';
import { StatsModel } from 'src/app/models/stats.model';
import { UserService } from 'src/app/services/user-service.service';
import { TeamModel } from 'src/app/models/team.model';
import { TeamService } from 'src/app/services/team.service';
import { PaginatorModel } from 'src/app/models/pagintor.model';
import { GameModel } from 'src/app/models/game.model';

@Component({
  selector: 'app-player-page',
  templateUrl: './player-page.component.html',
  styleUrls: ['./player-page.component.scss']
})
export class PlayerPageComponent implements OnInit {

  public player: PlayerModel;
  public gamesStats: Array<StatsModel>;
  public gamesIds: Array<GameModel>;
  public games: Array<GameModel>;
  public team: TeamModel;
  public textBig: boolean;
  public meta: PaginatorModel;
  public simpleData: boolean;
  public currentStats: StatsModel;
  public currentGame: Number;
  constructor(private activate: ActivatedRoute, private userService: UserService, private teamService: TeamService) { }

  ngOnInit(): void {
    this.textBig = true;
    this.simpleData = true;
    this.player = this.activate.snapshot.data.player;
    this.player.avatar = this.userService.setAvatar();
    this.gamesStats = this.activate.snapshot.data.stats.data;
    this.meta = this.activate.snapshot.data.stats.meta;
    this.games = this._getGamesFromStats(this.gamesStats);
    this.teamService.getTeamById(this.player.team.id).subscribe(res => {
      this.team = res;
    })
  }

  private _getGamesFromStats(stats: Array<StatsModel>): Array<GameModel> {
    let filteredGames = stats.map(g => g.game);
    return filteredGames;
  }

  public onShowStatsEvent(event) {
    this._filterStats(event[1].game.id, this.gamesStats);
  }

  private _filterStats(id: number, games: any): void {
    let filteredGame = games.find(g => g.game.id === id);
    this.currentStats = filteredGame;
    this.currentGame = filteredGame.game.id;
    debugger
  }
}
