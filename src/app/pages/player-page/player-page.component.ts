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
  public gamesIds: Array<number>;
  public games: Array<GameModel>;
  public team: TeamModel;
  public textBig: boolean;
  public meta: PaginatorModel;
  constructor(private activate: ActivatedRoute, private userService: UserService, private teamService: TeamService) { }

  ngOnInit(): void {
    this.textBig = true;
    this.player = this.activate.snapshot.data.player;
    this.player.avatar = this.userService.setAvatar();
    this.gamesStats = this.activate.snapshot.data.stats.data;
    this.meta = this.activate.snapshot.data.stats.meta;
    this.gamesIds = this._getIdsGamesFromStats(this.gamesStats);
    // this.teamService.getManyGamesById(this.gamesIds).subscribe(res => {
    //   debugger
    //   this.games = res
    // })
    // debugger
    this.teamService.getTeamById(this.player.team.id).subscribe(res => {
      this.team = res;
    })
  }

  private _getIdsGamesFromStats(stats: Array<StatsModel>): Array<number> {
    let ids = stats.map(g => g.game.id);
    // debugger
    return ids;
  }

}
