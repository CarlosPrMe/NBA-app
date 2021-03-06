import { Component, OnInit, ElementRef, ViewChild } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { PlayerModel } from 'src/app/models/player.model';
import { StatsModel } from 'src/app/models/stats.model';
import { UserService } from 'src/app/services/user-service.service';
import { TeamModel } from 'src/app/models/team.model';
import { TeamService } from 'src/app/services/team.service';
import { PaginatorModel } from 'src/app/models/pagintor.model';
import { GameModel } from 'src/app/models/game.model';
import { PlayerService } from '../../services/player.service';
import { SearcherService } from 'src/app/services/searcher.service';

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
  public formDisabled: boolean;

  public pagesNum: Array<number>;
  public seasonsAvailable: Array<number>;
  public perPage: number;
  public season: string;
  public current_page: number;
  public postseasonFilter: boolean;
  public filteredByPostseason: boolean;
  private gamesPostseason: Array<GameModel>;

  @ViewChild('stats') containerGames: ElementRef;

  constructor(private _activate: ActivatedRoute, private _userService: UserService,
    private _teamService: TeamService, private _playerService: PlayerService, private _searcherService: SearcherService) { }

  ngOnInit(): void {
    this.simpleData = true;
    this.formDisabled = false;
    this.filteredByPostseason = false;
    this.perPage = 10;
    this.current_page = 1;
    this._searcherService.currentSeason.subscribe(data => {
      this.season = data || '2019';
    })
    this.postseasonFilter = false;
    this.pagesNum = [5, 10, 15];
    this.seasonsAvailable = this._createSeasonsList(1978);
    this.textBig = true;

    if (this._playerService.playerSelected.value) {
      this.player = this._playerService.playerSelected.value.player;
      this.player.team = this._playerService.playerSelected.value.team || this._activate.snapshot.data.player.team;
    }
    else {
      this.player = this._activate.snapshot.data.player;
      this.player.avatar = this._userService.setAvatar();
    }

    this.gamesStats = this._activate.snapshot.data.stats.data;
    this.meta = this._activate.snapshot.data.stats.meta;
    this.games = this._getGamesFromStats(this.gamesStats);
    this._teamService.getTeamById(this.player.team.id).subscribe(res => {
      this.team = res;
    })
    this._activate.params.subscribe(res => {
      this._playerService.getPlayerById(res.id).subscribe(player => {
        if (this.player.id !== player.id || !this.player) {
          this.player = player;
          !this.player.avatar ? this.player.avatar = this._userService.setAvatar() : null;
          this._teamService.getTeamById(this.player.team.id).subscribe(team => {
            this.team = team;
          })
          this._playerService.getStatsPlayerById(player.id).subscribe(data => {
            this.gamesStats = data.data;
            this.perPage = 10;
            this.postseasonFilter = false;
            this.meta = data.meta;
            this.games = this._getGamesFromStats(this.gamesStats);
          })
        }
      })
    })
  }

  public onChangeParams(event) {
    this.formDisabled = true;

    // Check type of input from filters

    if (isNaN(event)) {
      this.perPage = event.per_page;
      this.season = event.season;
      this.current_page = 1;
      this.postseasonFilter = event.postseason;
      this.filteredByPostseason = false;
    } else {
      this.current_page = event;
    }

    // Check if user request games of postseason

    if (!this.postseasonFilter) {
      this._playerService.getStatsPlayerById(this.player.id, this.current_page, this.perPage, this.season).subscribe(res => {
        this.gamesStats = res.data;
        this.games = this._getGamesFromStats(this.gamesStats);
        this.meta = res.meta;
        this.filteredByPostseason = false;
        this.formDisabled = false;
        this._scroll();
      })

    } else {

      // User request postseason games, that games are solicited just one time

      if (!this.filteredByPostseason) {
        this.current_page = 1;
        this._playerService.getStatsPlayerById(this.player.id, this.current_page, 100, this.season).subscribe(res => {
          this.gamesStats = this._filterPostSeasonGames(res.data);
          this.games = this._getGamesFromStats(this.gamesStats);
          this.gamesPostseason = this.games.slice(); // Save postseason games
          this.meta = this._metaPostSeasonGames(this.games, this.perPage, +this.current_page);
          this.games = this._getPagesPostSeason(this.games, this.current_page, +this.perPage);
          this.formDisabled = false;
        })

      } else {
        // Pagination on postseason games
        this.meta = this._metaPostSeasonGames(this.gamesPostseason, this.perPage, +this.current_page);
        this.games = this._getPagesPostSeason(this.gamesPostseason, this.current_page, +this.perPage);
        this.formDisabled = false;
      }
      this.filteredByPostseason = true;
      this._scroll();
    }
  }

  public onShowStatsEvent(event) {
    this._filterStats(event[1].game.id, this.gamesStats);
    this._scroll();
  }

  private _getGamesFromStats(stats: Array<StatsModel>): Array<GameModel> {
    let filteredGames = stats.map(g => g.game);
    return filteredGames;
  }

  private _filterStats(id: number, games: any): void {
    let filteredGame = games.find(g => g.game.id === id);
    this.currentStats = filteredGame;
    this.currentGame = filteredGame.game.id;
  }

  private _createSeasonsList(limitYear) {
    let myArr = [];
    for (let i = 2019; i > limitYear; i--) {
      myArr.push(i)
    }
    return myArr;
  }

  private _scroll() {
    window.scroll({
      top: 0,
      left: 0,
      behavior: 'smooth'
    })
  }

  private _filterPostSeasonGames(games: Array<any>): Array<any> {
    return games.filter(g => g.game.postseason);
  }

  private _getPagesPostSeason(games: Array<any>, numPage: number, perPage: number): Array<any> {
    let myArr = games.slice((numPage - 1) * perPage, (perPage * numPage));
    return myArr;
  }

  private _metaPostSeasonGames(games: any, numPages: number, currentPage: number): any {
    let newMeta = {
      total_pages: Math.ceil(games.length / numPages),
      current_page: currentPage,
      per_page: +numPages,
      total_count: games.length
    };
    return newMeta
  }
}
