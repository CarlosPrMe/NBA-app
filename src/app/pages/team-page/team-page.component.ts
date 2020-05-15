import { Component, OnInit, ViewChild, ElementRef, AfterViewChecked } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { TeamModel } from 'src/app/models/team.model';
import { TeamService } from 'src/app/services/team.service';
import { UserService } from 'src/app/services/user-service.service';

@Component({
  selector: 'app-team-page',
  templateUrl: './team-page.component.html',
  styleUrls: ['./team-page.component.scss']
})
export class TeamPageComponent implements OnInit, AfterViewChecked {

  @ViewChild('container') container: ElementRef;
  private offsetTop: number;
  public idTeam: string;
  public team: TeamModel;
  public players: Array<any>;
  public games: Array<any>;
  public meta: any;
  public avatars: Array<any>;
  public pagesNum: Array<any>;
  public smallTeamName: boolean;
  private perPage: any;
  private current_page: number;
  private season: string;
  private postseasonFilter: boolean;
  public seasonsAvailable: any;
  public formDisabled: boolean;
  private filteredByPostseason: boolean;
  private gamesPostseason: Array<any>;
  constructor(private activate: ActivatedRoute, private teamService: TeamService, private userService: UserService) { }

  ngOnInit(): void {
    this.formDisabled = false;
    this.filteredByPostseason = false;
    this.perPage = 10;
    this.current_page = 1;
    this.season = '2018';
    this.postseasonFilter = false;
    this.smallTeamName = true;
    this.pagesNum = [5, 10, 15];
    this.seasonsAvailable = this._createSeasonsList(1978);
    this.team = this.activate.snapshot.data.team;
    this.games = this.activate.snapshot.data.games.data;
    this.meta = this.activate.snapshot.data.games.meta;

    if (!this.players) {
      this.teamService.getStatsById(this.games[0].id).subscribe(res => {
        this.players = res.data.filter(p => {
          if (p.team.id === this.team.id_team) {
            return p.player;
          }
        }).map(p => {
          !p.avatar ? p.player.avatar = this.userService.setAvatar() : null;
          return p.player
        })
      })
    }
  }

  ngAfterViewChecked() {
    if (!this.offsetTop) this.offsetTop = this.container.nativeElement.offsetTop;
  }

  private _createSeasonsList(limitYear) {
    let myArr = [];
    for (let i = 2018; i > limitYear; i--) {
      myArr.push(i)
    }
    return myArr;
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
      this.teamService.getGamesByTeam(this.team.id_team, this.current_page, this.perPage, this.season).subscribe(res => {
        this.games = res.data;
        this.meta = res.meta;
        this.filteredByPostseason = false;
        this.formDisabled = false;
        this._scroll();
      })
    } else {

      // User request postseason games, that games are solicited just one time

      if (!this.filteredByPostseason) {
        this.current_page = 1;
        this.teamService.getGamesByTeam(this.team.id_team, this.current_page, 100, this.season).subscribe(res => {
          this.games = this._filterPostSeasonGames(res.data);
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
    let myArr = games.slice((numPage - 1) * perPage, (perPage*numPage));
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
