import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { TeamService } from 'src/app/services/team.service';
import { TeamModel } from 'src/app/models/team.model';
import { GameModel } from 'src/app/models/game.model';

@Component({
  selector: 'app-teams',
  templateUrl: './teams.component.html',
  styleUrls: ['./teams.component.scss']
})
export class TeamsComponent implements OnInit {

  public imageHeader: boolean;
  public teams: Array<TeamModel>;
  public teamsSorted: Array<any>;
  public westConference: Array<TeamModel>;
  public eastConference: Array<TeamModel>;
  public playoffWest: Array<any>;
  public playoffEast: Array<any>;
  public playoffs: Array<any>;
  public simulated: boolean;
  public winner: TeamModel;
  public matchesResume: Array<GameModel>;
  public resumeShow: boolean;
  public currentDetailId: number;
  public noDate: boolean;
  private positionScroll: number;
  public textConference: Array<string>;

  constructor(private _activateRouter: ActivatedRoute, private _teamService: TeamService) { }

  ngOnInit(): void {
    this.noDate = true;
    this.resumeShow = false;
    this.imageHeader = true;
    this.westConference = [];
    this.eastConference = [];
    this.teams = this._activateRouter.snapshot.data.teams;
    this.textConference = ['Conferencia Oeste', 'Conferencia Este'];
    this.teams.forEach((team: any) => {
      team.won_games = this._randomNumber(0, this.teams.length);
    })
    this.teams = this._sortByWonGames(this.teams);
    this.teams.forEach(team => team.conference === "East" ? this.eastConference.push(team) : this.westConference.push(team));
    this.teamsSorted = [this.westConference, this.eastConference];
    this._createTeams();
  }


  private _sortByWonGames(teams: Array<any>): Array<any> {
    return teams.sort((a, b) => b.won_games - a.won_games);
  }

  private _randomNumber(min, max) {
    let num = Math.round(Math.random() * (max - min) + min);
    return num;
  }

  private _matchPlayOffs(teams: Array<any>, matchs): Array<any> {
    let teamsSorted = [];
    let length = teams.length - 1
    for (let i = 0; i < matchs; i++) {
      let match = [teams[i], teams[length - i]];
      teamsSorted.push(match);
    }
    return teamsSorted;
  }

  private _createTeams() {
    this.playoffWest = this.westConference.slice(0, 8);
    this.playoffWest = [this._matchPlayOffs(this.playoffWest, 4), new Array([], []), new Array([]), new Array([])];
    this.playoffEast = this.eastConference.slice(0, 8);
    this.playoffEast = [this._matchPlayOffs(this.playoffEast, 4), new Array([], []), new Array([]), new Array([])];
    this.playoffs = [this.playoffWest, this.playoffEast];
    this.simulated = false;
    this.winner = null;
  }

  public simulateGames() {
    this.playoffWest[1] = [[this.playoffWest[0][0][this._randomNumber(0, 1)], this.playoffWest[0][1][this._randomNumber(0, 1)]], [this.playoffWest[0][2][this._randomNumber(0, 1)], this.playoffWest[0][3][this._randomNumber(0, 1)]]];
    this.playoffWest[2] = [[this.playoffWest[1][0][this._randomNumber(0, 1)], this.playoffWest[1][1][this._randomNumber(0, 1)]]];
    this.playoffWest[3] = [[this.playoffWest[2][0][this._randomNumber(0, 1)]]];


    this.playoffEast[1] = [[this.playoffEast[0][0][this._randomNumber(0, 1)], this.playoffEast[0][1][this._randomNumber(0, 1)]], [this.playoffEast[0][2][this._randomNumber(0, 1)], this.playoffEast[0][3][this._randomNumber(0, 1)]]];
    this.playoffEast[2] = [[this.playoffEast[1][0][this._randomNumber(0, 1)], this.playoffEast[1][1][this._randomNumber(0, 1)]]];
    this.playoffEast[3] = [[this.playoffEast[2][0][this._randomNumber(0, 1)]]];

    this.winner = [this.playoffWest[3][0][0], this.playoffEast[3][0][0]][this._randomNumber(0, 1)];
    this.simulated = true;
  }

  public resetGames() {
    this._createTeams()
  }

  public showDetails(event, id) {
    let content = document.getElementsByClassName('teams__details--show');
    if (id !== this.currentDetailId) {
      this.currentDetailId = id;
      this.matchesResume = null;
      this.positionScroll = window.pageYOffset;
      this._teamService.getGamesByTeam(id).subscribe(res => {
        this.matchesResume = res.data;
        this.resumeShow = true;
      })
    } else if (id === this.currentDetailId && content.length) {
      content[0].classList.remove('teams__details--show');
      this.resumeShow = false;
      this._scroll(this.positionScroll);
    } else if (id === this.currentDetailId) {
      this.resumeShow = true;
    }
  }

  public hideMatch() {
    this.resumeShow = !this.resumeShow;
  }

  private _scroll(position) {
    window.scroll({
      top: position,
      left: 0,
      behavior: 'smooth'
    });
  }
}