import { Component, OnInit, ViewChild, ElementRef, AfterViewChecked, OnDestroy } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { TeamModel } from 'src/app/models/team.model';
import { TeamService } from 'src/app/services/team.service';
import { UserService } from 'src/app/services/user-service.service';
import { PlayerModel } from 'src/app/models/player.model';
import { GameModel } from 'src/app/models/game.model';
import { SearcherService } from 'src/app/services/searcher.service';
import { UserModel } from 'src/app/models/user.model';

@Component({
  selector: 'app-team-page',
  templateUrl: './team-page.component.html',
  styleUrls: ['./team-page.component.scss']
})
export class TeamPageComponent implements OnInit, AfterViewChecked, OnDestroy {

  @ViewChild('container') container: ElementRef;
  private offsetTop: number;
  public idTeam: string;
  public team: TeamModel;
  public players: Array<PlayerModel>;
  public games: Array<GameModel>;
  public meta: any;
  public pagesNum: Array<number>;
  public smallTeamName: boolean;
  public season: string;
  public seasonTeam: string;
  private postseasonFilter: boolean;
  public seasonsAvailable: Array<number>;
  public formDisabled: boolean;
  public hidePlayoffs: boolean;
  public user: UserModel;
  public isMyFavouriteTeam: boolean;
  public filteredByPostseason: boolean;
  public perPage: number;
  private _current_page: number;
  private _gamesPostseason: Array<GameModel>;
  constructor(private _activate: ActivatedRoute, private _teamService: TeamService,
    private _userService: UserService, private _searcherService: SearcherService) { }

  ngOnInit(): void {
    this.hidePlayoffs = true;
    this.seasonTeam = '2019';
    this.formDisabled = false;
    this.filteredByPostseason = false;
    this.perPage = 10;
    this._current_page = 1;
    this._searcherService.currentSeason.subscribe(data => {
      this.season = data;
    })
    this.postseasonFilter = false;
    this.smallTeamName = true;
    this.pagesNum = [5, 10, 15];
    this.seasonsAvailable = this._createSeasonsList(1978);
    this.team = this._activate.snapshot.data.team;
    this.games = this._activate.snapshot.data.games.data;
    this.meta = this._activate.snapshot.data.games.meta;
    this._userService.user.subscribe(res => {
      this.user = res;
      if (this.user?._id) {
        this.isMyFavouriteTeam = this._userService.checkFavouriteTeam(this.team?.id_team, this.user?.fav_team);
      }
    })
    this._checkPlayers();
    this._activate.params.subscribe(res => {
      let currentTeamId = +res.id;
      if (currentTeamId !== this.team.id_team) {
        this.players = null;
        this.team = null;
        this.seasonTeam = '2019';
        this._teamService.getTeamById(currentTeamId).subscribe(team => {
          this.team = team;
          this.isMyFavouriteTeam = this._userService.checkFavouriteTeam(this.team?.id_team, this.user?.fav_team);
          this._teamService.getGamesByTeam(currentTeamId, this._current_page, this.perPage, this.season).subscribe(data => {
            this.games = data.data;
            this.meta = data.meta;
            this._checkPlayers();
          })
        })
      }
    })
  }

  ngAfterViewChecked() {
    if (!this.offsetTop) this.offsetTop = this.container.nativeElement.offsetTop;
  }

  ngOnDestroy() {
    this._searcherService.currentSeason.next(null);
  }

  public onChangeParams(event) {
    this.formDisabled = true;

    // Check type of input from filters

    if (isNaN(event)) {
      this.perPage = event.per_page;
      this.season = event.season;
      this._current_page = 1;
      this.postseasonFilter = event.postseason;
      this.filteredByPostseason = false;
    } else {
      this._current_page = event;
    }

    // Check if user request games of postseason

    if (!this.postseasonFilter) {
      this._teamService.getGamesByTeam(this.team.id_team, this._current_page, this.perPage, this.season).subscribe(res => {
        this.games = res.data;
        this.meta = res.meta;
        this.filteredByPostseason = false;
        this.formDisabled = false;
        this._scroll();
      })
    } else {

      // User request postseason games, that games are solicited just one time

      if (!this.filteredByPostseason) {
        this._current_page = 1;
        this._teamService.getGamesByTeam(this.team.id_team, this._current_page, 100, this.season).subscribe(res => {
          this.games = this._filterPostSeasonGames(res.data);
          this._gamesPostseason = this.games.slice(); // Save postseason games
          this.meta = this._metaPostSeasonGames(this.games, this.perPage, +this._current_page);
          this.games = this._getPagesPostSeason(this.games, this._current_page, +this.perPage);
          this.formDisabled = false;
        })
      } else {
        // Pagination on postseason games
        this.meta = this._metaPostSeasonGames(this._gamesPostseason, this.perPage, +this._current_page);
        this.games = this._getPagesPostSeason(this._gamesPostseason, this._current_page, +this.perPage);
        this.formDisabled = false;
      }

      this.filteredByPostseason = true;
      this._scroll();

    }
  }

  public onChangeSeason(event) {
    this.formDisabled = true;
    this.seasonTeam = event.season;
    this._getPlayers(this.seasonTeam)
  }

  private _checkPlayers() {
    if (!this.players) {
      this._getPlayers('2019');
    }
  }

  private _getPlayers(season) {
    this._teamService.getGamesByTeam(this.team.id_team, 0, 10, season).subscribe(res => {
      let id = res.data[0].id;
      this._teamService.getStatsById(id).subscribe(data => {
        this.players = data.data.filter(p => {
          if (p.team.id === this.team.id_team) {
            return p.player;
          }
        }).map(p => {
          !p.avatar ? p.player.avatar = this._userService.setAvatar() : null;
          return p.player
        })
      })
      this.formDisabled ? this.formDisabled = false : null
    })
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
      top: this.offsetTop - 50,
      left: 0,
      behavior: "smooth"
    })
  }

  private _filterPostSeasonGames(games: Array<any>): Array<any> {
    return games.filter(g => g.postseason);
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
    return newMeta;
  }

  public onModifyFavouritesTeams(team, isMyFavouriteTeam) {
    let favouriteTeam: Array<number>;
    isMyFavouriteTeam ? favouriteTeam = [] : favouriteTeam = [team];
    let newUser = { ...this.user, fav_team: favouriteTeam }
    this._userService.modifiUser(newUser).subscribe(res => {
      this._userService.user.next(res);
    })
  }
}
