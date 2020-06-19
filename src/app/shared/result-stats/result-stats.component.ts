import { Component, OnInit, Input, OnChanges, SimpleChanges, ElementRef, ViewChild, AfterViewChecked, HostListener } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { GameModel } from 'src/app/models/game.model';
import { PlayerModel } from 'src/app/models/player.model';
import { TeamModel } from 'src/app/models/team.model';
import { Router } from '@angular/router';

@Component({
  selector: 'app-result-stats',
  templateUrl: './result-stats.component.html',
  styleUrls: ['./result-stats.component.scss']
})
export class ResultStatsComponent implements OnInit, OnChanges, AfterViewChecked {

  @ViewChild('detail') detail: ElementRef;
  @ViewChild('container') statsContainer: ElementRef

  @Input() stats: Array<any>;
  @Input() idStats: string;
  @Input() game: GameModel;
  @Input() pageStats: boolean;
  public currentGame: GameModel;
  public homeTeamPlayers: Array<PlayerModel>;
  public homeTeam: TeamModel
  public visitorTeamPlayers: Array<PlayerModel>;
  public visitorTeam: TeamModel;
  public teams: Array<any>;
  public playerStats: any;
  public gameDate: any;
  public myForm: FormGroup;
  public optionsFilter: Array<any>;
  public sortBy: string;
  public descendent: boolean;
  public showComplete: boolean;
  private _statsHeight: number;
  public atHome: boolean;
  public initialValue: any;
  public searching: boolean;

  constructor(private _fb: FormBuilder, private _router: Router) { }

  ngOnInit(): void {
    this.optionsFilter = [
      {
        text: 'Puntos',
        class: 'form__input',
        value: 'pts',
      },
      {
        text: 'Rebotes',
        class: 'form__input',
        value: 'reb'
      },
      {
        text: 'Asistencias',
        class: 'form__input',
        value: 'ast'
      },
      {
        text: 'Minutos',
        class: 'form__input',
        value: 'min'
      },
    ]

    this.myForm = this._fb.group(
      {
        sort: ['pts']
      }
    )

    this.initialValue = this.optionsFilter[0];
    this.searching = false;
    this.descendent = true;
    this.showComplete = false;
    this.sortTeams(this.myForm.value);
    this._router.url.indexOf('home') > -1 ? this.atHome = true : this.atHome = false;
  }

  ngOnChanges(change: SimpleChanges) {
    this.searching = true;
    if (!change?.game?.firstChange) {
      this._resetHeightContent();
    }

    if (change?.game?.firstChange) {
      this.homeTeam = {};
      this.visitorTeam = {};
    }

    if (change.game?.currentValue?.game) {
      this.currentGame = change.game.currentValue.game;
      this.gameDate = change.game.currentValue.game.date;
    }

    if (change.game?.currentValue?.home_team) {
      this.homeTeam.id_team = change.game.currentValue.home_team.id_team;
      this.homeTeam.team_color = change.game.currentValue.home_team.team_color;
      this.homeTeam.full_name = change.game.currentValue.home_team.full_name;
      this.homeTeam.image_url = change.game.currentValue.home_team.image_url;

      this.visitorTeam.id_team = change.game.currentValue.visitor_team.id_team;
      this.visitorTeam.team_color = change.game.currentValue.visitor_team.team_color;
      this.visitorTeam.full_name = change.game.currentValue.visitor_team.full_name;
      this.visitorTeam.image_url = change.game.currentValue.visitor_team.image_url;
    }

    if (change.stats?.currentValue) {
      this.homeTeam.players = change.stats.currentValue.filter(player => player.team.id === this.homeTeam.id_team);
      this.visitorTeam.players = change.stats.currentValue.filter(player => player.team.id === this.visitorTeam.id_team);
      this.teams = [this.homeTeam, this.visitorTeam];
      setTimeout(() => {
        this.searching = false;
      }, 150);
    }

    if (this.myForm?.value) {
      this.sortTeams(this.myForm.value);
    }
  }

  ngAfterViewChecked() {
    this._getHeightContent();
  }

  onDetailsPlayer(event) {
    setTimeout(() => {
      this.playerStats = event;
    }, 50);
  }

  public onCloseDetails(event) {
    this.playerStats = null;
  }

  public sortTeams(form) {
    this.sortBy = form.sort || this.sortBy;
    this.visitorTeam.players = this.descendent ? this._sort(this.visitorTeam.players) : this._sort(this.visitorTeam.players).reverse();
    this.visitorTeam.players = this.playersNoAction(this.visitorTeam.players);
    this.homeTeam.players = this.descendent ? this._sort(this.homeTeam.players) : this._sort(this.homeTeam.players).reverse();
    this.homeTeam.players = this.playersNoAction(this.homeTeam.players);
  }

  private _sort(team: Array<PlayerModel>): Array<PlayerModel> {
    return team.sort((a, b) => {
      if (isNaN(b[this.sortBy])) {
        return parseFloat(b[this.sortBy]) - parseFloat(a[this.sortBy]);
      } else {
        return b[this.sortBy] - a[this.sortBy];
      }
    });
  }

  public changeOrder(event, form) {
    event.currentTarget.classList.toggle('rotate');
    this.descendent = !this.descendent;
    this.sortTeams(form)
  }

  public showMore(event) {
    this.showComplete = !this.showComplete;
    this.statsContainer.nativeElement.classList.toggle('stats--dropdown');
  }

  public onNewValueFilter(event) {
    this.sortBy = event;
    this.sortTeams(event)
  }

  private playersNoAction(team: Array<any>): Array<any> {
    let playersAction = [];
    let playersNoAction = [];
    team.map(player => {
      player.min !== null ? playersAction.push(player) : playersNoAction.push(player)
    })
    return playersAction.concat(playersNoAction);
  }

  private _getHeightContent(): void {
    if (this.statsContainer && !this._statsHeight && !this.pageStats) {
      this._statsHeight = this.statsContainer.nativeElement.clientHeight;
      this._changeValueHeight(this._statsHeight);
      !this.showComplete ? this.statsContainer.nativeElement.classList.add('stats--small') : this.statsContainer.nativeElement.classList.add('stats--small', 'stats--dropdown');
    }
  }

  private _changeValueHeight(value: number): void {
    document.querySelector("html").style.setProperty('--height-dropdown', `${value}px`);
  }

  private _resetHeightContent(condition: boolean = false): void {
    this.statsContainer.nativeElement.classList.remove('stats--small', 'stats--dropdown');
    this._statsHeight = null;
    this.showComplete = condition;
  }

  @HostListener('window:resize', ['$event'])
  onResize(event) {
    this._resetHeightContent(this.showComplete);
  }
}
