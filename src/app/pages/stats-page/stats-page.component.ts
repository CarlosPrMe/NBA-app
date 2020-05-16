import { Component, OnInit, HostListener, ElementRef, ViewChild } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { TeamService } from 'src/app/services/team.service';
import { TeamModel } from 'src/app/models/team.model';
import { PlayerModel } from 'src/app/models/player.model';
import { GameModel } from 'src/app/models/game.model';
import { StatsModel } from 'src/app/models/stats.model';

@Component({
  selector: 'app-stats-page',
  templateUrl: './stats-page.component.html',
  styleUrls: ['./stats-page.component.scss']
})
export class StatsPageComponent implements OnInit {

  @ViewChild('detail') detail: ElementRef;
  public stats: Array<any>;
  public idStatsDetails: string;
  public homeTeamId: number;
  public visitorTeamId: number;
  public homeTeam: TeamModel;
  public visitorTeam: TeamModel;
  public playersByTeam: Array<any>;
  public homeTeamPlayers: Array<StatsModel>;
  public visitorTeamPlayers: Array<StatsModel>;
  public game: GameModel;
  public gameSelected: GameModel;
  public teams: Array<TeamModel>;
  public playerStats: any;
  public pageStats: boolean;
  public topPlayers: Array<PlayerModel>;
  private filterTopPlayer: Array<string>;
  public highlights: boolean;
  public textHighlights: Array<string>;

  constructor(private activateRouter: ActivatedRoute, private teamService: TeamService) { }

  ngOnInit(): void {

    this.highlights = true;
    this.filterTopPlayer = ['pts', 'reb', 'ast', 'blk'];
    this.textHighlights = ['anotador', 'reboteador', 'asistente', 'taponador'];
    this.pageStats = true;
    this.stats = this.activateRouter.snapshot.data.stats.data;
    this.idStatsDetails = this.activateRouter.snapshot.params.id;
    this.game = this.stats[0].game;
    this.homeTeamId = this.game.home_team_id;
    this.visitorTeamId = this.game.visitor_team_id;

    this.teamService.getTeamImagesById([this.homeTeamId, this.visitorTeamId]).subscribe(data => {
      this.homeTeam = data.find(team => team.id_team === this.homeTeamId);
      this.visitorTeam = data.find(team => team.id_team === this.visitorTeamId);
      this.teams = [this.homeTeam, this.visitorTeam];
      this.homeTeamPlayers = this.stats.filter(p => p.team.id === this.homeTeamId);
      this.visitorTeamPlayers = this.stats.filter(p => p.team.id === this.visitorTeamId);
      this.playersByTeam = [this.homeTeamPlayers, this.visitorTeamPlayers];
      this.gameSelected = { game: this.game, home_team: this.homeTeam, visitor_team: this.visitorTeam };
      this.topPlayers = this._getTopPlayers(this.stats, this.filterTopPlayer);
    })
  }

  public onDetailsPlayer(event) {
    setTimeout(() => {
      this.playerStats = event;
    }, 50);
  }

  public onCloseDetails(event) {
    this.playerStats = null;
  }

  private _getTopPlayers(players: Array<any>, paramFilters: Array<string>): Array<any> {
    let topPlayers: Array<any> = [];
    let random = this._randomMVP(0, 3);
    paramFilters.forEach((param, index) => {
      let player: any = {};
      let newArr = players.sort((a, b) => b[param] - a[param]);
      player.top = param;
      player.mvp = index === random ? true : false;
      player.player = newArr[0];
      player.player.team.image_url = this._addImageUrlTopPlayer(player, this.teams);
      topPlayers.push(player);
    })
    return topPlayers;
  }

  private _addImageUrlTopPlayer(player: any, teams: Array<any>): string {
    let team = teams.find(team => team.id_team === player.player.team.id);
    return team.image_url
  }


  private _randomMVP(min, max) {
    let num = Math.round(Math.random() * (max - min) + min);
    return num;
  }
}
